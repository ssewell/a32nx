import { ArraySubject, DisplayComponent, EventBus, FSComponent, Subject, Subscribable, VNode } from '@microsoft/msfs-sdk';
import { FMMessage, FMMessageTypes } from '@shared/FmMessages';
import { EfisNdMode } from '@shared/NavigationDisplay';
import { Layer } from '../MsfsAvionicsCommon/Layer';
import { FmsVars } from '../MsfsAvionicsCommon/providers/FmsDataPublisher';

export interface FmMessagesProps {
    bus: EventBus,

    mode: Subscribable<EfisNdMode>,
}

export class FmMessages extends DisplayComponent<FmMessagesProps> {
    private readonly activeMessages = ArraySubject.create<FMMessage>([]);

    private readonly lastActiveMessage = Subject.create<FMMessage | null>(null);

    private readonly boxRef = FSComponent.createRef<SVGRectElement>();

    private readonly overflowArrowRef = FSComponent.createRef<SVGPathElement>();

    private readonly backgroundFillShown = this.props.mode.map((it) => it === EfisNdMode.ARC || it === EfisNdMode.ROSE_NAV);

    private readonly visible = this.props.mode.map((mode) => {
        if (mode === EfisNdMode.ROSE_ILS || mode === EfisNdMode.ROSE_VOR) {
            return false;
        }

        return true;
    });

    onAfterRender(node: VNode) {
        super.onAfterRender(node);

        const sub = this.props.bus.getSubscriber<FmsVars>();

        this.activeMessages.sub((_, type, ___, array) => {
            this.lastActiveMessage.set(array[array.length - 1]);
        });

        sub.on('ndMessageFlags').whenChanged().handle((value) => {
            this.handleNewMessageFlags(value);
            this.handleBoxVisibility();
            this.handleOverflowArrow();
        });
    }

    private handleNewMessageFlags(messageFlags: number) {
        const newActiveMessages = this.activeMessages.getArray().slice();

        // the list must be ordered by priority, and LIFO for equal priority
        for (const message of Object.values(FMMessageTypes)) {
            if (((message.ndFlag ?? 0) & messageFlags) > 0) {
                if (newActiveMessages.findIndex(({ ndFlag }) => ndFlag === message.ndFlag) === -1) {
                    newActiveMessages.push(message);
                    newActiveMessages.sort((a, b) => (b.ndPriority ?? 0) - (a.ndPriority ?? 0));
                }
            } else if ((message.ndFlag ?? 0) > 0) {
                const idx = newActiveMessages.findIndex(({ ndFlag }) => ndFlag === message.ndFlag);
                if (idx !== -1) {
                    newActiveMessages.splice(idx, 1);
                }
            }
        }

        this.activeMessages.set(newActiveMessages);
    }

    private handleBoxVisibility() {
        const shown = this.activeMessages.length > 0;

        this.boxRef.instance.style.visibility = shown ? 'inherit' : 'hidden';
    }

    private handleOverflowArrow() {
        const shown = this.activeMessages.length > 1;

        this.overflowArrowRef.instance.style.visibility = shown ? 'inherit' : 'hidden';
    }

    render(): VNode | null {
        return (
            <Layer x={164} y={707} visible={this.visible}>
                <rect
                    visibility={this.backgroundFillShown.map((shown) => (shown ? 'inherit' : 'hidden'))}
                    x={0}
                    y={27}
                    width={440}
                    height={34}
                    class="BackgroundFill"
                    stroke="none"
                />

                <rect ref={this.boxRef} x={0} y={0} width={440} height={27} class="Grey BackgroundFill" stroke-width={1.75} />

                { /* the text message is offset from centre on the real one...
                 guess by the width of the multiple message arrow... */ }
                <text
                    x={420 / 2}
                    y={25}
                    class={this.lastActiveMessage.map((it) => `${it?.color ?? ''} MiddleAlign`)}
                    text-anchor="middle"
                    font-size={27}
                >
                    {this.lastActiveMessage.map((it) => {
                        if (!it) {
                            return 'null';
                        }

                        if (it.efisText) {
                            return it.efisText;
                        }

                        return it.text;
                    })}
                </text>

                <path ref={this.overflowArrowRef} d="M428,2 L428,20 L424,20 L430,28 L436,20 L432,20 L432,2 L428,2" class="Green Fill" />
            </Layer>
        );
    }
}
