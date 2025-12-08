export function formatError(err) {
	return err?.response?.message ?? err?.response?.data?.message;
}