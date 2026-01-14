import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { loginSchema } from '@/app/schemas/loginSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import toast from 'react-hot-toast';

export function LoginPopover({ iconSize, iconColor }) {
	const [open, setOpen] = useState(false);
	const { user, login, logout, isLoading } = useAuth();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data) => {
		try {
			await login(data.email, data.password);
			toast.success('Logged in successfully');
			reset();
			setOpen(false);
		} catch (error) {
			toast.error(error.response?.data?.message || 'Login failed');
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
			toast.success('Logged out');
			setOpen(false);
		} catch {
			toast.error('Logout failed');
		}
	};

	if (isLoading) {
		return (
			<button className="min-w-min min-h-min p-0.5">
				<CircleUserRound
					strokeWidth={1.3}
					width={iconSize}
					height={iconSize}
					color={iconColor}
				/>
			</button>
		);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button className="min-w-min min-h-min p-0.5">
					<CircleUserRound
						strokeWidth={1.3}
						width={iconSize}
						height={iconSize}
						color={iconColor}
					/>
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-72" align="end">
				{user ? (
					<div className="space-y-4">
						<div className="text-sm">
							<p className="font-medium">{user.forename} {user.surname}</p>
							<p className="text-gray-500">{user.email}</p>
						</div>
						<div className="space-y-2">
							<Button asChild variant="outline" className="w-full">
								<Link to="/account" onClick={() => setOpen(false)}>My Account</Link>
							</Button>
							<Button
								variant="ghost"
								className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
								onClick={handleLogout}
							>
								Log out
							</Button>
						</div>
					</div>
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-sky-500 hover:bg-sky-600"
						>
							{isSubmitting ? 'Logging in...' : 'Log in'}
						</Button>

						<p className="text-center text-sm text-gray-500">
							No account?{' '}
							<Link
								to="/register"
								className="text-sky-600 hover:underline"
								onClick={() => setOpen(false)}
							>
								Register
							</Link>
						</p>
					</form>
				)}
			</PopoverContent>
		</Popover>
	);
}