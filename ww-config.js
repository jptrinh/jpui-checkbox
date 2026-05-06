export default {
    editor: {
        label: { en: 'Checkbox' },
        icon: 'checkbox',
        customStylePropertiesOrder: [
            {
                label: 'Box',
                isCollapsible: true,
                properties: ['size', 'iconSize', 'borderRadius', 'borderWidth', 'gap', 'shadow', 'animationDuration'],
            },
            {
                label: 'Unchecked',
                isCollapsible: true,
                properties: ['uncheckedBgColor', 'uncheckedBorderColor'],
            },
            {
                label: 'Active',
                isCollapsible: true,
                properties: ['primaryColor', 'checkedHoverColor', 'markColor'],
            },
            {
                label: 'Custom icons',
                isCollapsible: true,
                properties: ['checkmarkSvg', 'indeterminateSvg'],
            },
            {
                label: 'Focus-visible',
                isCollapsible: true,
                properties: ['focusRingColor', 'focusRingWidth', 'focusRingOffset'],
            },
            {
                label: 'Invalid',
                isCollapsible: true,
                properties: ['invalidBorderColor', 'invalidFocusRingColor'],
            },
            {
                label: 'Disabled',
                isCollapsible: true,
                properties: ['disabledOpacity'],
            },
            {
                label: 'Read-only',
                isCollapsible: true,
                properties: ['readonlyOpacity'],
            },
        ],
    },
    properties: {
        // ─── Settings ────────────────────────────────────────────────────────────

        initialValue: {
            label: { en: 'Initial value' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Boolean or null. true = checked, false = unchecked, null = indeterminate.',
            },
            /* wwEditor:end */
        },

        disabled: {
            label: { en: 'Disabled' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            states: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Disables the checkbox when true.',
            },
            /* wwEditor:end */
        },

        readonly: {
            label: { en: 'Read only' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            states: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Prevents toggling the checkbox when true.',
            },
            /* wwEditor:end */
        },

        invalid: {
            label: { en: 'Invalid' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            states: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Marks the checkbox as invalid (shows error border).',
            },
            /* wwEditor:end */
        },

        required: {
            label: { en: 'Required' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            states: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Marks the checkbox as required (aria-required).',
            },
            /* wwEditor:end */
        },

        cursorPointer: {
            label: { en: 'Cursor pointer' },
            type: 'OnOff',
            section: 'style',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'When enabled, shows a pointer cursor on the checkbox box and label.',
            },
            /* wwEditor:end */
        },

        clickableLabel: {
            label: { en: 'Clickable label' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'When enabled, clicking the label dropzone also toggles the checkbox.',
            },
            /* wwEditor:end */
        },

        labelPosition: {
            label: { en: 'Label position' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'right', label: 'Right' },
                    { value: 'left', label: 'Left' },
                ],
            },
            defaultValue: 'right',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: "Valid values: 'right' | 'left'",
            },
            /* wwEditor:end */
        },

        // ─── Dropzone ────────────────────────────────────────────────────────────

        dropzoneContent: {
            hidden: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip: 'Elements dropped into the label area.',
            },
            /* wwEditor:end */
        },

        // ─── Form integration ─────────────────────────────────────────────────

        form: {
            editorOnly: true,
            hidden: true,
            defaultValue: false,
        },

        /* wwEditor:start */
        formInfobox: {
            type: 'InfoBox',
            section: 'settings',
            options: (_, sidePanelContent) => ({
                variant: sidePanelContent.form?.name ? 'success' : 'warning',
                icon: 'pencil',
                title: sidePanelContent.form?.name || 'Unnamed form',
                content: !sidePanelContent.form?.name && 'Give your form a meaningful name.',
                cta: {
                    label: 'Select form',
                    action: 'selectForm',
                },
            }),
            hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
        },
        /* wwEditor:end */

        fieldName: {
            label: 'Field name',
            section: 'settings',
            type: 'Text',
            defaultValue: '',
            states: true,
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Field name used in form submission data.',
            },
            propertyHelp: {
                tooltip: 'The key under which this value appears in form submission data.',
            },
            /* wwEditor:end */
            hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
        },

        customValidation: {
            label: 'Custom validation',
            section: 'settings',
            type: 'OnOff',
            defaultValue: false,
            states: true,
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Enable custom validation formula for this field.',
            },
            /* wwEditor:end */
            hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
        },

        validation: {
            label: 'Validation',
            section: 'settings',
            type: 'Formula',
            defaultValue: '',
            states: true,
            bindable: false,
            responsive: true,
            hidden: (content, sidePanelContent) => !sidePanelContent.form?.uid || !content.customValidation,
        },

        // ─── Style: Box ───────────────────────────────────────────────────────

        size: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 12, max: 64 }],
                noRange: false,
                useVar: true,
            },
            defaultValue: '20px',
            bindable: true,
            responsive: true,
            states: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Checkbox box size in px (e.g. "20px").',
            },
            /* wwEditor:end */
        },

        iconSize: {
            label: { en: 'Icon size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: '%', label: '%', min: 20, max: 100 },
                    { value: 'px', label: 'px', min: 4, max: 48 },
                ],
                noRange: true,
                useVar: true,
            },
            defaultValue: '65%',
            bindable: true,
            responsive: true,
            states: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Size of the checkmark/dash icon inside the box (e.g. "65%", "14px").',
            },
            /* wwEditor:end */
        },

        borderRadius: {
            label: { en: 'Border radius' },
            type: 'Spacing',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 32 },
                    { value: '%', label: '%', min: 0, max: 50 },
                ],
                noRange: true,
                useVar: true,
                isCorner: true
            },
            defaultValue: '4px',
            bindable: true,
            responsive: true,
            states: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border radius of the checkbox box (e.g. "4px", "50%").',
            },
            /* wwEditor:end */
        },

        borderWidth: {
            label: { en: 'Border width' },
            type: 'Number',
            section: 'style',
            options: { min: 0, max: 8, step: 1 },
            defaultValue: 2,
            bindable: true,
            responsive: true,
            states: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'Border width of the checkbox box in pixels.',
            },
            /* wwEditor:end */
        },

        gap: {
            label: { en: 'Gap' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 64 },
                    { value: 'rem', label: 'rem', min: 0, max: 4 },
                ],
                noRange: true,
                useVar: true,
            },
            defaultValue: '8px',
            bindable: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Space between the checkbox box and the label dropzone.',
            },
            /* wwEditor:end */
        },

        shadow: {
            label: { en: 'Shadow' },
            type: 'Shadows',
            section: 'style',
            options: {
                nullable: true,
            },
            defaultValue: '',
            bindable: true,
            responsive: true,
            states: true,
            classes: true,
        },

        animationDuration: {
            label: { en: 'Transition duration' },
            type: 'Number',
            section: 'style',
            options: { min: 0, max: 500, step: 10 },
            defaultValue: 150,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'Duration of the checkmark appear/disappear transition in milliseconds (0 to disable).',
            },
            /* wwEditor:end */
        },

        // ─── Style: Unchecked ─────────────────────────────────────────────────

        uncheckedBgColor: {
            label: { en: 'Background color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#ffffff',
            bindable: true,
            states: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color when the checkbox is unchecked.',
            },
            /* wwEditor:end */
        },

        uncheckedBorderColor: {
            label: { en: 'Border color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#d1d5db',
            bindable: true,
            states: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border color when the checkbox is unchecked.',
            },
            /* wwEditor:end */
        },

        // ─── Style: Active ────────────────────────────────────────────────────

        primaryColor: {
            label: { en: 'Active color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#3b82f6',
            bindable: true,
            states: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background and border color when checked or indeterminate.',
            },
            propertyHelp: {
                tooltip: 'Applied as background and border when the checkbox is checked or indeterminate.',
            },
            /* wwEditor:end */
        },

        checkedHoverColor: {
            label: { en: 'Active hover color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#2563eb',
            bindable: true,
            states: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background and border color when checked or indeterminate and hovered.',
            },
            /* wwEditor:end */
        },

        markColor: {
            label: { en: 'Mark color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#ffffff',
            bindable: true,
            states: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the checkmark or indeterminate dash.',
            },
            /* wwEditor:end */
        },

        // ─── Style: Custom icons ──────────────────────────────────────────────

        checkmarkSvg: {
            label: { en: 'Checkmark SVG' },
            type: 'Text',
            section: 'style',
            defaultValue: '',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Custom SVG string to replace the default checkmark. Leave empty to use the built-in icon.',
            },
            propertyHelp: {
                tooltip: 'Paste a full SVG string to override the default checkmark. Leave empty to use the built-in icon.\n\n⚠️ Things to check:\n• viewBox must match the coordinate space of the path (e.g. "0 0 256 256" for Phosphor icons, not "0 0 12 12").\n• Use currentColor for stroke or fill so the icon inherits the Mark color setting. Avoid hardcoded color values.\n• Fill-based icons: set fill="currentColor" on the path tag, and do NOT set fill="none" on the root svg tag.\n• Stroke-based icons: set stroke="currentColor" on the shape tag and fill="none" on the root svg tag.',
            },
            /* wwEditor:end */
        },

        indeterminateSvg: {
            label: { en: 'Indeterminate SVG' },
            type: 'Text',
            section: 'style',
            defaultValue: '',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Custom SVG string to replace the default indeterminate dash. Leave empty to use the built-in icon.',
            },
            propertyHelp: {
                tooltip: 'Paste a full SVG string to override the default indeterminate dash. Leave empty to use the built-in icon.\n\n⚠️ Things to check:\n• viewBox must match the coordinate space of the path (e.g. "0 0 256 256" for Phosphor icons, not "0 0 12 12").\n• Use currentColor for stroke or fill so the icon inherits the Mark color setting. Avoid hardcoded color values.\n• Fill-based icons: set fill="currentColor" on the path tag, and do NOT set fill="none" on the root svg tag.\n• Stroke-based icons: set stroke="currentColor" on the shape tag and fill="none" on the root svg tag.',
            },
            /* wwEditor:end */
        },

        // ─── Style: States ────────────────────────────────────────────────────

        invalidBorderColor: {
            label: { en: 'Invalid border color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#ef4444',
            bindable: true,
            states: true,
            responsive: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border color shown when the checkbox is in an invalid state.',
            },
            /* wwEditor:end */
        },

        invalidFocusRingColor: {
            label: { en: 'Invalid focus ring color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#fca5a5',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Outline color shown on keyboard focus when the checkbox is invalid.',
            },
            propertyHelp: {
                tooltip: 'Overrides the default focus ring color when the checkbox is in an invalid state.',
            },
            /* wwEditor:end */
        },

        focusRingColor: {
            label: { en: 'Focus ring color' },
            type: 'Color',
            section: 'style',
            defaultValue: '#93c5fd',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Outline color shown on keyboard focus (focus-visible only).',
            },
            propertyHelp: {
                tooltip: 'Only visible when navigating via keyboard, not on mouse click.',
            },
            /* wwEditor:end */
        },

        focusRingWidth: {
            label: { en: 'Focus ring width' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 8 }],
                noRange: true,
                useVar: true,
            },
            defaultValue: '3px',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Width of the keyboard focus ring (e.g. "3px").',
            },
            /* wwEditor:end */
        },

        focusRingOffset: {
            label: { en: 'Focus ring offset' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 16 }],
                noRange: true,
                useVar: true,
            },
            defaultValue: '2px',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Offset between the checkbox box and the focus ring (e.g. "2px").',
            },
            /* wwEditor:end */
        },

        disabledOpacity: {
            label: { en: 'Disabled opacity' },
            type: 'Number',
            section: 'style',
            options: { min: 0, max: 1, step: 0.05 },
            defaultValue: 0.5,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'Opacity of the checkbox when disabled (0–1).',
            },
            /* wwEditor:end */
        },

        // ─── Style: Read-only ─────────────────────────────────────────────────

        readonlyOpacity: {
            label: { en: 'Opacity' },
            type: 'Number',
            section: 'style',
            options: { min: 0, max: 1, step: 0.05 },
            defaultValue: 1,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'Opacity of the checkbox when read-only (0–1).',
            },
            /* wwEditor:end */
        },
    },

    triggerEvents: [
        {
            name: 'change',
            label: { en: 'On change' },
            event: { value: false },
            default: true,
        },
        {
            name: 'checked',
            label: { en: 'On checked' },
            event: { value: true },
        },
        {
            name: 'unchecked',
            label: { en: 'On unchecked' },
            event: { value: false },
        },
        {
            name: 'indeterminate',
            label: { en: 'On indeterminate' },
            event: { value: null },
        },
    ],
};
