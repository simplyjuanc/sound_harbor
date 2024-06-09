import "server-only";
import { type ReactNode } from "react";

interface ConditionalProps {
    showWhen: boolean,
    children: ReactNode,
}


export default function Conditional({ showWhen, children }: ConditionalProps) {
    return ( showWhen ? <>{ children }</> : <> </>)
}