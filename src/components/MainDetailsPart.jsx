import useCart, {useCartDispatch} from '@/app/contexts/CartContext.jsx';
import toast from 'react-hot-toast';
import {Button} from '@/components/ui/button.jsx';
import {Badge} from '@/components/ui/badge.jsx';
import React, {useEffect, useState} from 'react';
import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel.jsx';
import {ChevronLeft, ChevronRight, ShoppingCart, Zap} from 'lucide-react';
import {Divider} from '@/components/ui/divider.jsx';

MainDetailsPart.propTypes = {
    part: Object,
}

export function MainDetailsPart({part}) {
    const [selectedImage, setSelectedImage] = useState({source: '/fallback.jpg'});
    const [hoveredImage, setHoveredImage] = useState(null);

    const dispatch = useCartDispatch();
    const cart = useCart();

    if (!part.id) return <p className="text-red-600">ERROR</p>;

    const isSoldOut = part.quantity === 0;
    const isLowStock = part.quantity > 0 && part.quantity <= 3;

    function onAdd(part) {
        const id = part.id;
        if (!id || isSoldOut) return;

        const cartItem = cart.find(item => item.id === id);


        if (cartItem?.quantity + 1 > part.quantity) {
            toast.error('Not enough in stock to add to your cart');
            return;
        }

        dispatch({
            type: 'add', item: {id, quantity: 1}
        });

        toast.success('Added to cart!');
    }

    function findNextImage() {
        const currentIndex = part.images.findIndex(image => image.id === selectedImage.id);
        if (currentIndex === -1 || currentIndex + 1 === part.images.length) {
            return part.images[0];
        }
        return part.images[currentIndex + 1];
    }

    function findPreviousImage() {
        const currentIndex = part.images.findIndex(image => image.id === selectedImage.id);
        if (currentIndex === -1 || currentIndex - 1 < 0) {
            return part.images[part.images.length - 1];
        }
        return part.images[currentIndex - 1];
    }

    useEffect(() => {
        if (part.images?.length > 0) {
            let thumbnail = part.images.find(image => image.isThumbnail) ?? part.images[0];
            if (thumbnail) setSelectedImage(thumbnail);

            if (part.images.find(image => image.id === thumbnail.id)) {
                let index = part.images.findIndex(image => image.id === thumbnail.id);
                part.images.splice(index, 1);
            }
            part.images.unshift(thumbnail);
        }
    }, []);

    return (<div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 grid-rows-2 md:grid-rows-1 gap-3">
            {/* Image Gallery - kept your structure */}
            <div className="lg:col-span-3 lg:h-[72vh] h-[50vh] col-span-2 relative">
                <div className="h-9/12 p-4 min-w-full flex items-center">
                    <ChevronLeft
                        size={42}
                        className="cursor-pointer ms-auto absolute lg:left-12 left-7 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        onClick={() => {
                            if (part.images.length > 0) setSelectedImage(findPreviousImage());
                        }}
                    />
                    <img
                        className="h-full mx-auto"
                        src={hoveredImage?.source ?? selectedImage.source}
                        alt="Selected part image"
                    />
                    <ChevronRight
                        size={42}
                        className="cursor-pointer me-auto absolute lg:right-12 right-7 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        onClick={() => {
                            if (part.images.length > 0) setSelectedImage(findNextImage());
                        }}
                    />
                </div>
                <Carousel className="absolute bottom-0 mt-5 px-4">
                    <CarouselContent className="flex flex-row row-span-1">
                        {part.images.map(image => (<CarouselItem
                                key={image.id}
                                className={`flex-1 min-w-1/5 max-w-1/5 p-0 m-0.5 cursor-pointer rounded border-gray-700 ${selectedImage.id === image.id ? 'border-2' : `${hoveredImage?.id === image.id ? 'border' : ''}`}`}
                                onMouseEnter={() => setHoveredImage(image)}
                                onMouseLeave={() => setHoveredImage(null)}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img className="mx-auto lg:h-30 md:h-17 h-10" src={image.source} alt="Part images"/>
                            </CarouselItem>))}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Info Panel - Right */}
            <div
                className="lg:col-span-1 lg:h-[72vh] h-[50vh] col-span-2 p-8 box-border border-[0.5px] rounded bg-gray-100 shadow-lg">
                <h1 className="font-bold text-4xl text-start">{part.name}</h1>
                <Divider/>

                <h2 className="text-3xl font-bold text-start">€{part.price}</h2>

                {/* Stock Status - more prominent */}
                <div className="mt-3">
                    {isSoldOut ? (
                        <Badge variant="destructive" className="text-base px-4 py-1">Sold Out</Badge>) : isLowStock ? (
                        <Badge className="text-base px-4 py-1 bg-amber-500">Only {part.quantity} left</Badge>) : (
                        <Badge variant="outline" className="text-base px-4 py-1 text-green-700 border-green-700">
                            {part.quantity} in stock
                        </Badge>)}
                </div>

                <Divider/>

                <div className="flex flex-col items-center mt-6 justify-end gap-3">
                    <Button
                        size="lg"
                        className="bg-sky-500 w-9/12 hover:bg-sky-600 transition-colors"
                        onClick={() => onAdd(part)}
                        disabled={isSoldOut}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5"/>
                        Add to cart
                    </Button>
                    <Button
                        size="lg"
                        className="bg-orange-400 hover:bg-orange-500 transition-colors text-black w-9/12"
                        onClick={() => toast.error('Feature is currently not implemented')}
                        disabled={isSoldOut}
                    >
                        <Zap className="mr-2 h-5 w-5"/>
                        Buy now
                    </Button>
                </div>
            </div>
        </div>);
}