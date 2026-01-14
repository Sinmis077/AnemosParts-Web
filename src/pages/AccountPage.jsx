import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { accountService } from '@/app/services/accountService';
import toast from 'react-hot-toast';

export function AccountPage() {
	const { user, isLoading, checkAuth } = useAuth();
	const [activeTab, setActiveTab] = useState('profile');

	if (isLoading) {
		return (
			<main className="flex justify-center py-12">
				<Spinner />
			</main>
		);
	}

	if (!user) {
		return <Navigate to="/" replace />;
	}

	return (
		<main className="max-w-4xl mx-auto py-12 px-4">
			<h1 className="text-3xl font-bold mb-8">My Account</h1>

			<div className="flex gap-4 border-b mb-6">
				<button
					onClick={() => setActiveTab('profile')}
					className={`pb-2 px-1 ${activeTab === 'profile' ? 'border-b-2 border-sky-500 text-sky-600' : 'text-gray-500'}`}
				>
					Profile
				</button>
				<button
					onClick={() => setActiveTab('orders')}
					className={`pb-2 px-1 ${activeTab === 'orders' ? 'border-b-2 border-sky-500 text-sky-600' : 'text-gray-500'}`}
				>
					Orders
				</button>
			</div>

			{activeTab === 'profile' && <ProfileTab user={user} onUpdate={checkAuth} />}
			{activeTab === 'orders' && <OrdersTab />}
		</main>
	);
}

function ProfileTab({ user, onUpdate }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty },
	} = useForm({
		defaultValues: {
			forename: user.forename || '',
			surname: user.surname || '',
		},
	});

	const onSubmit = async (data) => {
		try {
			await accountService.update(user.id, data);
			await onUpdate();
			toast.success('Profile updated');
		} catch (error) {
			toast.error(error.response?.data?.message || 'Update failed');
		}
	};

	return (
		<div className="max-w-md">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input
							id="email"
							value={user.email}
							disabled
							className="bg-gray-100"
						/>
					</Field>

					<Field>
						<FieldLabel htmlFor="forename">First Name</FieldLabel>
						<Input
							id="forename"
							{...register('forename', { required: 'First name is required' })}
						/>
						{errors.forename && <FieldError>{errors.forename.message}</FieldError>}
					</Field>

					<Field>
						<FieldLabel htmlFor="surname">Last Name</FieldLabel>
						<Input
							id="surname"
							{...register('surname', { required: 'Last name is required' })}
						/>
						{errors.surname && <FieldError>{errors.surname.message}</FieldError>}
					</Field>

					<Button
						type="submit"
						disabled={isSubmitting || !isDirty}
						className="bg-sky-500 hover:bg-sky-600"
					>
						{isSubmitting ? 'Saving...' : 'Save Changes'}
					</Button>
				</FieldGroup>
			</form>
		</div>
	);
}

function OrdersTab() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await accountService.getOrders();
				setOrders(response.data.orders || []);
			} catch {
				toast.error('Failed to load orders');
			} finally {
				setIsLoading(false);
			}
		};
		fetchOrders();
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	if (orders.length === 0) {
		return (
			<div className="text-center py-12 text-gray-500">
				<p>No orders yet.</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{orders.map((order) => (
				<div key={order.id} className="border rounded-lg p-4">
					<div className="flex justify-between items-start mb-3">
						<div>
							<p className="font-medium">Order #{order.id}</p>
							<p className="text-sm text-gray-500">
								{new Date(order.orderDate).toLocaleDateString()}
							</p>
						</div>
						<OrderStatusBadge status={order.status} />
					</div>

					{order.address && (
						<div className="text-sm text-gray-600 mb-3">
							<p>{order.address.street} {order.address.houseNumber}</p>
							<p>{order.address.postalCode} {order.address.city}</p>
							<p>{order.address.country}</p>
						</div>
					)}

					<div className="border-t pt-3">
						{order.items?.map((item) => (
							<div key={item.id} className="flex justify-between text-sm py-1">
								<span>{item.partName} x{item.quantity}</span>
								<span>€{item.price}</span>
							</div>
						))}
						<div className="flex justify-between font-medium pt-2 border-t mt-2">
							<span>Total</span>
							<span>€{order.total}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

function OrderStatusBadge({ status }) {
	const styles = {
		PAID: 'bg-green-100 text-green-800',
		PROCESSING: 'bg-yellow-100 text-yellow-800',
		SHIPPED: 'bg-blue-100 text-blue-800',
		DELIVERED: 'bg-gray-100 text-gray-800',
		CANCELLED: 'bg-red-100 text-red-800',
	};

	return (
		<span className={`px-2 py-1 rounded text-sm ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
	);
}