import SwiftUI

struct CalendarNoteView: View {
    let calendarRootNote: NoteItem
    @Environment(AppState.self) private var appState
    @State private var vm: CalendarNoteViewModel?
    @State private var navigateToNoteId: String?
    @State private var showYearPicker = false
    @State private var pickerYear = Calendar.current.component(.year, from: Date())

    var body: some View {
        Group {
            if let vm {
                calendarBody(vm)
            } else {
                ProgressView()
            }
        }
        .task(id: calendarRootNote.noteId) {
            vm = CalendarNoteViewModel(calendarRootId: calendarRootNote.noteId, appState: appState)
        }
        .navigationDestination(item: $navigateToNoteId) { linkedNoteId in
            NoteDetailView(noteId: linkedNoteId, title: "")
        }
    }

    @ViewBuilder
    private func calendarBody(_ vm: CalendarNoteViewModel) -> some View {
        VStack(spacing: 0) {
            calendarNavBar(vm)
            Divider()
            calendarContent(vm)
        }
        .task(id: "\(vm.viewMode.rawValue)-\(vm.currentDate.timeIntervalSince1970)") {
            await vm.loadVisibleDayNotes()
        }
        .overlay {
            if vm.isCreating {
                ProgressView("Creating note…")
                    .padding()
                    .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
            }
        }
        .sheet(isPresented: $showYearPicker) {
            yearPickerSheet(vm)
                .presentationDetents([.height(280)])
        }
    }

    // MARK: - Navigation bar

    @ViewBuilder
    private func calendarNavBar(_ vm: CalendarNoteViewModel) -> some View {
        VStack(spacing: 8) {
            HStack {
                Button { vm.goToPrevious() } label: {
                    Image(systemName: "chevron.left")
                        .font(.title3.weight(.medium))
                }

                Spacer()

                if vm.viewMode == .year {
                    Button {
                        pickerYear = Calendar.current.component(.year, from: vm.currentDate)
                        showYearPicker = true
                    } label: {
                        HStack(spacing: 4) {
                            Text(vm.navigationTitle)
                                .font(.headline)
                            Image(systemName: "chevron.down")
                                .font(.caption.weight(.semibold))
                        }
                    }
                    .buttonStyle(.plain)
                } else {
                    Text(vm.navigationTitle)
                        .font(.headline)
                }

                Spacer()

                Button { vm.goToNext() } label: {
                    Image(systemName: "chevron.right")
                        .font(.title3.weight(.medium))
                }
            }
            .padding(.horizontal)

            HStack {
                Button {
                    vm.goToToday()
                } label: {
                    Text("Today")
                        .font(.subheadline.weight(.medium))
                }

                Spacer()

                Picker("View", selection: Bindable(vm).viewMode) {
                    ForEach(CalendarViewMode.allCases, id: \.self) { mode in
                        Text(mode.rawValue.capitalized).tag(mode)
                    }
                }
                .pickerStyle(.segmented)
                .frame(maxWidth: 220)
            }
            .padding(.horizontal)
        }
        .padding(.vertical, 8)
        .background(Color(.systemGroupedBackground))
    }

    // MARK: - Content switcher

    @ViewBuilder
    private func calendarContent(_ vm: CalendarNoteViewModel) -> some View {
        switch vm.viewMode {
        case .month:
            monthView(vm)
        case .week:
            weekView(vm)
        case .year:
            yearView(vm)
        }
    }

    // MARK: - Month View

    private let weekdaySymbols: [String] = {
        let ordered = ["Su", "M", "Tu", "W", "Th", "F", "Sa"]
        let first = Calendar.current.firstWeekday // 1 = Sunday
        return (0..<7).map { ordered[($0 + first - 1) % 7] }
    }()

    @ViewBuilder
    private func monthView(_ vm: CalendarNoteViewModel) -> some View {
        let days = CalendarNoteViewModel.daysInMonth(for: vm.currentDate)
        let offset = CalendarNoteViewModel.firstWeekdayOffset(for: vm.currentDate)
        let columns = Array(repeating: GridItem(.flexible(), spacing: 0), count: 7)

        ScrollView {
            LazyVGrid(columns: columns, spacing: 0) {
                ForEach(weekdaySymbols, id: \.self) { symbol in
                    Text(symbol)
                        .font(.caption2.weight(.semibold))
                        .foregroundStyle(.secondary)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 6)
                }

                ForEach(0..<offset, id: \.self) { _ in
                    Color.clear
                        .frame(height: 64)
                }

                ForEach(days, id: \.self) { date in
                    dayCell(date: date, vm: vm, compact: false)
                }
            }
            .padding(.horizontal, 4)
        }
    }

    // MARK: - Week View

    @ViewBuilder
    private func weekView(_ vm: CalendarNoteViewModel) -> some View {
        let weekDates = CalendarNoteViewModel.weekDates(for: vm.currentDate)
        let columns = Array(repeating: GridItem(.flexible(), spacing: 0), count: 7)

        VStack(spacing: 0) {
            LazyVGrid(columns: columns, spacing: 0) {
                ForEach(weekdaySymbols, id: \.self) { symbol in
                    Text(symbol)
                        .font(.caption2.weight(.semibold))
                        .foregroundStyle(.secondary)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 6)
                }

                ForEach(weekDates, id: \.self) { date in
                    dayCell(date: date, vm: vm, compact: false)
                        .frame(minHeight: 100)
                }
            }
            .padding(.horizontal, 4)

            Spacer()
        }
    }

    // MARK: - Year View

    @ViewBuilder
    private func yearView(_ vm: CalendarNoteViewModel) -> some View {
        let cal = Calendar.current
        let year = cal.component(.year, from: vm.currentDate)
        let columns = Array(repeating: GridItem(.flexible(), spacing: 12), count: 3)

        ScrollView {
            LazyVGrid(columns: columns, spacing: 16) {
                ForEach(1...12, id: \.self) { month in
                    yearMonthMiniGrid(year: year, month: month, vm: vm)
                }
            }
            .padding()
        }
    }

    @ViewBuilder
    private func yearMonthMiniGrid(year: Int, month: Int, vm: CalendarNoteViewModel) -> some View {
        let cal = Calendar.current
        let monthDate = cal.date(from: DateComponents(year: year, month: month, day: 1))!
        let days = CalendarNoteViewModel.daysInMonth(for: monthDate)
        let offset = CalendarNoteViewModel.firstWeekdayOffset(for: monthDate)
        let miniColumns = Array(repeating: GridItem(.flexible(), spacing: 1), count: 7)

        let monthName = DateFormatter().shortMonthSymbols[month - 1]

        VStack(spacing: 4) {
            Button {
                if let d = cal.date(from: DateComponents(year: year, month: month, day: 1)) {
                    vm.currentDate = d
                    vm.viewMode = .month
                }
            } label: {
                Text(monthName)
                    .font(.caption.weight(.semibold))
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .buttonStyle(.plain)

            LazyVGrid(columns: miniColumns, spacing: 2) {
                ForEach(0..<offset, id: \.self) { _ in
                    Text("")
                        .font(.system(size: 8))
                        .frame(width: 14, height: 14)
                }

                ForEach(days, id: \.self) { date in
                    let dayNum = cal.component(.day, from: date)
                    let iso = vm.isoString(for: date)
                    let hasNote = vm.dayNoteMap[iso] != nil
                    let today = vm.isToday(date)

                    Button {
                        vm.currentDate = date
                        vm.viewMode = .month
                    } label: {
                        Text("\(dayNum)")
                            .font(.system(size: 8))
                            .frame(width: 14, height: 14)
                            .foregroundStyle(today ? .white : (hasNote ? .primary : .secondary))
                            .background(
                                Group {
                                    if today {
                                        Circle().fill(.blue)
                                    } else if hasNote {
                                        Circle().fill(Color.blue.opacity(0.15))
                                    }
                                }
                            )
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .padding(8)
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }

    // MARK: - Day Cell

    @ViewBuilder
    private func dayCell(date: Date, vm: CalendarNoteViewModel, compact: Bool) -> some View {
        let cal = Calendar.current
        let dayNum = cal.component(.day, from: date)
        let iso = vm.isoString(for: date)
        let info = vm.dayNoteMap[iso]
        let today = vm.isToday(date)

        Button {
            Task {
                if let noteId = info?.noteId {
                    navigateToNoteId = noteId
                } else if let noteId = await vm.ensureDayNote(for: date) {
                    navigateToNoteId = noteId
                }
            }
        } label: {
            VStack(alignment: .leading, spacing: 2) {
                HStack {
                    Text("\(dayNum)")
                        .font(.caption.weight(today ? .bold : .regular))
                        .foregroundStyle(today ? .white : .primary)
                        .frame(width: 24, height: 24)
                        .background {
                            if today {
                                Circle().fill(.blue)
                            }
                        }
                    Spacer()
                }

                if let info {
                    Text(info.title)
                        .font(.system(size: 9))
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }

                Spacer(minLength: 0)
            }
            .padding(4)
            .frame(maxWidth: .infinity, minHeight: 64, alignment: .topLeading)
            .background(
                RoundedRectangle(cornerRadius: 4)
                    .fill(info != nil ? Color.blue.opacity(0.06) : Color.clear)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 4)
                    .stroke(Color(.separator).opacity(0.3), lineWidth: 0.5)
            )
        }
        .buttonStyle(.plain)
    }

    // MARK: - Year Picker Sheet

    @ViewBuilder
    private func yearPickerSheet(_ vm: CalendarNoteViewModel) -> some View {
        NavigationStack {
            Picker("Year", selection: $pickerYear) {
                ForEach(1970...2100, id: \.self) { y in
                    Text(String(y)).tag(y)
                }
            }
            .pickerStyle(.wheel)
            .navigationTitle("Jump to Year")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Go") {
                        vm.jumpToYear(pickerYear)
                        showYearPicker = false
                    }
                }
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        showYearPicker = false
                    }
                }
            }
        }
    }
}
