export interface Stat {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
}

export interface StatsList {
    id: string;
    stats: Stat[];
    content?: {
        title: string;
        description: string;
        button?: {
            text: string;
            link: string;
            variant?: 'primary' | 'secondary' | 'ghostLight' | 'ghostDark';
        };
    };
}

export const statsLists: Record<string, StatsList> = {
    main: {
        id: 'main',
        stats: [
            {
                value: 10,
                label: 'Theme Configurations',
            },
            {
                value: 11,
                label: 'Pre-Built Components',
            },
            {
                value: 48,
                label: 'Team Members',
            },
            {
                value: 500000,
                label: 'Lines of Code',
                prefix: '+'
            }
        ]
    },
    withContent: {
        id: 'withContent',
        stats: [
            {
                value: 700,
                label: 'Perusahaan Tercatat',
                prefix: '+'
            },
            {
                value: 4,
                label: 'Sektor Utama',
            },
            {
                value: 24,
                label: 'Update Harian',
                suffix: '/7'
            },
            {
                value: 50,
                label: 'Artikel per Bulan',
                prefix: '+'
            }
        ],
        content: {
            title: "Cakupan Lengkap Pasar Modal Indonesia",
            description: "Sahamindo menyediakan liputan komprehensif untuk seluruh ekosistem pasar modal Indonesia, dengan fokus pada sektor-sektor kunci yang menggerakkan ekonomi nasional.",
            button: {
                text: "Jelajahi Sektor",
                link: "/sektor",
                variant: "primary"
            }
        }
    }
};
