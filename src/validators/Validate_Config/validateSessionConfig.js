export function validateSessionConfig(session) {
    if (!session) {
        return;
    }

    if (
        session.maxAge !== undefined &&
        (
            typeof session.maxAge !== "number" ||
            session.maxAge <= 0
        )
    ) {
        throw new Error(
            "session.maxAge must be a positive number"
        );
    }
}