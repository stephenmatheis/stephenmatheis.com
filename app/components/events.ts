// Shared event contract every component in the system takes, alongside the
// color contract. Kept to the four that matter for a pointer-driven UI —
// enter/leave/over distinguish "arrived", "left", and "moving across";
// click covers activation from mouse, touch, and keyboard alike.
export type EventProps = {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onMouseOver?: React.MouseEventHandler;
    onClick?: React.MouseEventHandler;
};
