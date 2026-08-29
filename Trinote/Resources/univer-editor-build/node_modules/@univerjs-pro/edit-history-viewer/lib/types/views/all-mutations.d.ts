/**
 * All mutations collected from the Univer Pro project
 * Organized by plugin/package with comments indicating the source
 *
 * Note: The action field uses locale keys with the format `${localePrefix}actionName`
 * You may need to add corresponding translations in your locale files
 */
/**
 * All mutations organized by plugin
 * Format: { id: MutationClass.id, action: `${localePrefix}actionKey` }
 */
export declare function getAllMutations(localePrefix?: string): {
    collaboration: {
        id: string;
        action: string;
    }[];
    sheets: {
        id: string;
        action: string;
    }[];
    sheetsConditionalFormatting: {
        id: string;
        action: string;
    }[];
    sheetsFilter: {
        id: string;
        action: string;
    }[];
    dataValidation: {
        id: string;
        action: string;
    }[];
    sheetsChart: {
        id: string;
        action: string;
    }[];
    sheetsSparkline: {
        id: string;
        action: string;
    }[];
    sheetsPivot: {
        id: string;
        action: string;
    }[];
    sheetsShape: {
        id: string;
        action: string;
    }[];
    sheetsTable: {
        id: string;
        action: string;
    }[];
    sheetsDrawing: {
        id: string;
        action: string;
    }[];
};
/**
 * Get a flat array of all mutations
 */
export declare function getAllMutationsFlat(localePrefix?: string): ({
    id: string;
    action: string;
} | {
    id: string;
    action: string;
} | {
    id: string;
    action: string;
} | {
    id: string;
    action: string;
} | {
    id: string;
    action: string;
} | {
    id: string;
    action: string;
} | {
    id: string;
    action: string;
} | {
    id: string;
    action: string;
} | {
    id: string;
    action: string;
} | {
    id: string;
    action: string;
} | {
    id: string;
    action: string;
})[];
/**
 * Get mutations for specific plugins
 */
export declare function getMutationsByPlugins(plugins: string[], localePrefix?: string): {
    id: string;
    action: string;
}[];
