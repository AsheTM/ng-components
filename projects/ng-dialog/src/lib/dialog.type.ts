
export type TDialogRootConfiguration = {
  color: Record<'text' | 'background', TDialogRootConfigurationColor>;
};

export type TDialogRootConfigurationColor = Partial<{
  main: string;
  primary: string;
  secondary: string;
}>;

/** Optional labels of the buttons of an alert dialog; each omitted label falls back to its default. */
export type TDialogAlertLabels = Partial<Record<'closeLabel', string>>;

/** Optional labels of the buttons of a confirm or form dialog; each omitted label falls back to its default. */
export type TDialogLabels = Partial<Record<'closeLabel' | 'okLabel', string>>;
