// Type definitions for cavy 3.1
// Project: https://github.com/pixielabs/cavy
// Definitions by: Tyler Hoffman <https://github.com/tyler-hoffman>
//                 Abigail McPhillips <https://github.com/AbigailMcP>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0

import * as React from 'react';

export {};

type RefCallback = (element: React.ReactNode | null) => void;

type TestHookGeneratorWithRefCallback = (label: string, ref?: RefCallback) => RefCallback;
type TestHookGeneratorWithRefObject = (label: string, ref?: React.RefObject<any>) => React.RefObject<any>;

export type TestHookGenerator = TestHookGeneratorWithRefCallback & TestHookGeneratorWithRefObject;

export type WithTestHook<T extends {}> = T & { generateTestHook: TestHookGenerator };

export function hook<T extends {}>(component: React.ComponentClass<WithTestHook<T>>): React.ComponentClass<T>;

export function useCavy(): TestHookGenerator;

export interface TesterProps {
    store: TestHookStore;
    specs: Array<(spec: TestScope) => void>;
    waitTime?: number;
    startDelay?: number;
    clearAsyncStorage?: boolean;
    reporter?: (report: TestReport) => void;

    // Deprecated
    sendReport?: boolean;
}

export class Tester extends React.Component<TesterProps> {
    reRender(): void;
    clearAsync(): Promise<void>;
}

export class TestHookStore {}

export class TestScope {
    component: Tester;
    findComponent(identifier: string): Promise<React.Component>;
    describe(label: string, fn: () => void): void;
    it(label: string, fn: () => void): void;
    beforeEach(fn: () => void): void;
    press(identifier: string): Promise<void>;
    fillIn(identifier: string, str: string): Promise<void>;
    pause(time: number): Promise<void>;
    exists(identifier: string): Promise<true>;
    notExists(identifier: string): Promise<true>;
    containsText(identifier: string, text: string): Promise<void>;
}

export interface TestResult {
    message: string;
    passed: boolean;
}

export interface TestReport {
    results: ReadonlyArray<TestResult>;
    errorCount: number;
    duration: number;
}
