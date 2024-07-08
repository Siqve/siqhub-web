export const sendDataWithStreamController = async (
    controller: ReadableStreamDefaultController,
    data: any,
) => {
    controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
};
