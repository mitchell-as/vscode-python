// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as path from 'path';
import * as fs from 'fs-extra';
import { Extension, extensions } from 'vscode';
import { PVSC_EXTENSION_ID } from '../constants';

export function getExtension<T = unknown>(extensionId: string): Extension<T> | undefined {
    return extensions.getExtension(extensionId);
}

export function isExtensionEnabled(extensionId: string): boolean {
    return extensions.getExtension(extensionId) !== undefined;
}

export function isExtensionDisabled(extensionId: string): boolean {
    // We need an enabled extension to find the extensions dir.
    const pythonExt = getExtension(PVSC_EXTENSION_ID);
    if (pythonExt) {
        let found = false;
        fs.readdirSync(path.dirname(pythonExt.extensionPath), { withFileTypes: false }).forEach((s) => {
            if (s.toString().startsWith(extensionId)) {
                found = true;
            }
        });
        return found;
    }
    return false;
}
