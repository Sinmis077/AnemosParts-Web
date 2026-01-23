import * as z from 'zod';

export const registerSchema = z.object({
	forename: z.string()
		.min(2, 'First name must be at least 6 characters'),
	surname: z.string()
		.min(2, 'Last name must be at least 6 characters'),
	email: z.email('Invalid email address'),
	password: z.string()
		.min(8, 'Password must be at least 8 characters')
		.max(70, 'Password must be less than 70 characters'),
	confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword'],
});