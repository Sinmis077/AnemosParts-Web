import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { registerSchema } from '@/app/schemas/registerSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field';
import toast from 'react-hot-toast';

export function RegisterPage() {
	const navigate = useNavigate();
	const { register: registerUser } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			forename: '',
			surname: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data) => {
		try {
			const { confirmPassword, ...registerData } = data;
			await registerUser(registerData);
			toast.success('Account created successfully');
			navigate('/');
		} catch (error) {
			toast.error(error.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<main className="flex justify-center py-12 px-4">
			<div className="w-full max-w-md">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<FieldSet>
						<FieldLegend>Create Account</FieldLegend>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="forename">First Name</FieldLabel>
								<Input
									id="forename"
									{...register('forename')}
									placeholder="Enter your first name"
								/>
								{errors.forename && <FieldError>{errors.forename.message}</FieldError>}
							</Field>

							<Field>
								<FieldLabel htmlFor="surname">Last Name</FieldLabel>
								<Input
									id="surname"
									{...register('surname')}
									placeholder="Enter your last name"
								/>
								{errors.surname && <FieldError>{errors.surname.message}</FieldError>}
							</Field>

							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									{...register('email')}
									placeholder="your@email.com"
								/>
								{errors.email && <FieldError>{errors.email.message}</FieldError>}
							</Field>

							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input
									id="password"
									type="password"
									{...register('password')}
									placeholder="••••••••"
								/>
								{errors.password && <FieldError>{errors.password.message}</FieldError>}
							</Field>

							<Field>
								<FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
								<Input
									id="confirmPassword"
									type="password"
									{...register('confirmPassword')}
									placeholder="••••••••"
								/>
								{errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
							</Field>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-sky-500 hover:bg-sky-600"
							>
								{isSubmitting ? 'Creating account...' : 'Create Account'}
							</Button>
						</FieldGroup>
					</FieldSet>
				</form>

				<p className="text-center text-sm text-gray-500 mt-6">
					Already have an account?{' '}
					<Link to="/" className="text-sky-600 hover:underline">
						Log in
					</Link>
				</p>
			</div>
		</main>
	);
}