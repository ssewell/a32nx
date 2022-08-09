export const MapKey = ({ altKey, ctrlKey, key }) => {
    let mcduKey = key.toUpperCase(); // Defaults to the pressed key (for alphanumeric values)

    if (altKey && ctrlKey) {
        // If alt and ctrl key are down, perform MCDU mapping
        switch (mcduKey) {
        case 'F1':
            mcduKey = 'L1';
            break;
        case 'F2':
            mcduKey = 'L2';
            break;
        case 'F3':
            mcduKey = 'L3';
            break;
        case 'F4':
            mcduKey = 'L4';
            break;
        case 'F5':
            mcduKey = 'L5';
            break;
        case 'F6':
            mcduKey = 'L6';
            break;
        case 'F7':
            mcduKey = 'R1';
            break;
        case 'F8':
            mcduKey = 'R2';
            break;
        case 'F9':
            mcduKey = 'R3';
            break;
        case 'F10':
            mcduKey = 'R4';
            break;
        case 'F11':
            mcduKey = 'R5';
            break;
        case 'F12':
            mcduKey = 'R6';
            break;
        case 'Q':
            mcduKey = 'DIR';
            break;
        case 'W':
            mcduKey = 'PROG';
            break;
        case 'E':
            mcduKey = 'PERF';
            break;
        case 'R':
            mcduKey = 'INIT';
            break;
        case 'T':
            mcduKey = 'DATA';
            break;
        case 'A':
            mcduKey = 'FPLN';
            break;
        case 'S':
            mcduKey = 'RAD';
            break;
        case 'D':
            mcduKey = 'FUEL';
            break;
        case 'F':
            mcduKey = 'SEC';
            break;
        case 'G':
            mcduKey = 'ATC';
            break;
        case 'H':
            mcduKey = 'MENU';
            break;
        case 'Z':
            mcduKey = 'AIRPORT';
            break;
        case 'ARROWUP':
            mcduKey = 'UP';
            break;
        case 'ARROWDOWN':
            mcduKey = 'DOWN';
            break;
        case 'ARROWLEFT':
            mcduKey = 'PREVPAGE';
            break;
        case 'ARROWRIGHT':
            mcduKey = 'NEXTPAGE';
            break;
        case '.':
            mcduKey = 'DOT';
            break;
        case '-':
            mcduKey = 'PLUSMINUS';
            break;
        case '/':
            mcduKey = 'DIV';
            break;
        case ' ':
            mcduKey = 'SP';
            break;
        case '=':
            mcduKey = 'OVFY';
            break;
        case 'BACKSPACE':
            mcduKey = 'CLR';
            break;
        default:
            break;
        }
    } else {
        // These options can be used without CTRL and Alt pressed here as well
        switch (mcduKey) {
        case ' ':
            mcduKey = 'SP';
            break;
        case 'BACKSPACE':
            mcduKey = 'CLR';
            break;
        case '.':
            mcduKey = 'DOT';
            break;
        case '-':
            mcduKey = 'PLUSMINUS';
            break;
        case '/':
            mcduKey = 'DIV';
            break;
        case 'ARROWUP':
            mcduKey = 'UP';
            break;
        case 'ARROWDOWN':
            mcduKey = 'DOWN';
            break;
        case 'ARROWLEFT':
            mcduKey = 'PREVPAGE';
            break;
        case 'ARROWRIGHT':
            mcduKey = 'NEXTPAGE';
            break;
        default:
            break;
        }
    }

    return mcduKey;
};
