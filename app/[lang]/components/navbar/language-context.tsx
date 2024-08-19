import { createContext, SetStateAction } from "react";

// global state of languages available to the language switcher, used only for post pages
export const LanguageContext = createContext({state: [] as string[], setState: (a: SetStateAction<string[]>) => {}})