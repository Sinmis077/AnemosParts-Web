import React, { useEffect } from "react";
import useCart, { useCartDispatch, useCartItemIds } from '@/app/contexts/CartContext.jsx';
import { CartItem } from '@/components/CartItem.jsx';
import { useParts } from '@/app/hooks/useParts.js';
import { GoBackArrow } from "@/components/GoBackArrow.jsx";
import { Loading } from "@/components/Loading.jsx";
import { Error } from "@/components/Error.jsx";
import { CheckoutForm } from "@/components/CheckoutForm.jsx";
import { useCheckout } from "@/app/hooks/useCheckout.js";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";

export function CartPage() {
    const cart = useCart();
    const cartDispatch = useCartDispatch();
    const checkout = useCheckout();

    const {
        catalog: builtCart,
        isLoading,
        error,
    } = useParts(useCartItemIds());

    useEffect(() => {
        if (isLoading) return;

        const dbIds = builtCart.map((item) => item.id);
        const missingIds = cart.filter(({ id }) => !dbIds.includes(id));

        missingIds.forEach(({ id }) => {
            cartDispatch({ type: "remove", item: { id } });
        });
    }, [isLoading]);

    const getQuantityForItem = (itemId) => {
        return cart.find((cartItem) => cartItem.id === itemId)?.quantity ?? 1;
    };

    const calculateSubtotal = () => {
        return builtCart.reduce((total, item) => {
            const quantity = getQuantityForItem(item.id);
            return total + (item.price * quantity);
        }, 0);
    };

    const handleCheckout = (formData) => {
        checkout.mutate({
            ...formData,
            cart: {
                parts: cart.map((cartItem) => ({
                    partId: cartItem.id,
                    quantity: cartItem.quantity
                })),
            },
        });
    };

    if (isLoading) {
        return <Loading description="Loading your cart" />;
    }

    if (error) {
        return (
            <Error
                title="Failed to load your cart"
                message={error.message}
            />
        );
    }

    if (cart.length === 0) {
        return (
            <main className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center justify-center text-center">
                    <ShoppingCart className="h-24 w-24 text-gray-300 mb-6" />
                    <h1 className="text-2xl font-semibold text-gray-700 mb-2">
                        Your cart is empty
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Looks like you haven't added any parts yet.
                    </p>
                    <Link to="/catalog">
                        <Button className="bg-sky-500 hover:bg-sky-600">
                            Browse Parts
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    const subtotal = calculateSubtotal();

    return (
        <main className="container mx-auto px-4 py-6">
            <GoBackArrow />

            <h1 className="text-2xl font-bold mb-6">Your Cart ({cart.length} items)</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {builtCart.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            quantity={getQuantityForItem(item.id)}
                        />
                    ))}

                    <div className="flex justify-end pt-4 border-t">
                        <div className="text-right">
                            <p className="text-gray-600">Subtotal</p>
                            <p className="text-2xl font-bold">€{subtotal.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <CheckoutForm
                        onSubmit={handleCheckout}
                        isSubmitting={checkout.isPending}
                    />
                </div>
            </div>
        </main>
    );
}