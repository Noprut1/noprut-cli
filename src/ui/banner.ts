// BANNER - the NOPRUT CLI header

import chalk from 'chalk';
import { gradient } from './gradient.js';
import { C, dim, bold, thaiFlag, termWidth, visibleLength } from './theme.js';

const ART = [
    '███╗   ██╗ ██████╗ ██████╗ ██████╗ ██╗   ██╗████████╗',
    '████╗  ██║██╔═══██╗██╔══██╗██╔══██╗██║   ██║╚══██╔══╝',
    '██╔██╗ ██║██║   ██║██████╔╝██████╔╝██║   ██║   ██║',
    '██║╚██╗██║██║   ██║██╔═══╝ ██╔══██╗██║   ██║   ██║',
    '██║ ╚████║╚██████╔╝██║     ██║  ██║╚██████╔╝   ██║',
    '╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚═════╝    ╚═╝',
    '                 ██████╗██╗     ██╗',
    '                ██╔════╝██║     ██║',
    '                ██║     ██║     ██║',
    '                ██║     ██║     ██║',
    '                ╚██████╗███████╗██║',
    '                 ╚═════╝╚══════╝╚═╝',
    
];

const noprut = gradient([C.cyan, C.violet, C.pink]);

export function showBanner(version: string): void {
    const w = termWidth();
    console.log('');
    for (const line of ART) console.log('  ' + noprut(line));
    console.log('');

    const tag = `${bold(noprut('NOPRUT CLI'))} ${dim('v' + version)}  ${dim('·')}  ${chalk.hex(C.green)('AI coding agent')}  ${dim('·')}  ${thaiFlag()} ${chalk.hex(C.amber)('Made in Thailand')}`;
    console.log('  ' + tag);

    const sub = dim('  Autonomous · reads, writes & runs your code  ·  type ') + chalk.hex(C.blue)('/') + dim(' for commands');
    console.log(sub);
    console.log('  ' + dim('─'.repeat(Math.min(w, 64))));
    console.log('');
    void visibleLength;
}

/** A compact one-line header reprint (used after /clear). */
export function showMiniHeader(version: string): void {
    console.log('  ' + bold(noprut('NOPRUT CLI')) + dim(` v${version} `) + thaiFlag() + dim(' Made in Thailand'));
}
