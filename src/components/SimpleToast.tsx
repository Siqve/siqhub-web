export type SimpleToastProps = {
    message: string;
    type: "success" | "info" | "error";
}

export const SimpleToast = ({message, type}: SimpleToastProps) => {

    return <div className="fixed mx-auto bottom-5">
        <p>

        </p>
    </div>

}