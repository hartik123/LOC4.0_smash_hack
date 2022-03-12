import React from 'react'
import { CardGroup } from 'react-bootstrap';
import ProductCard from './ProductCard';

const TrackGoods = () => {
    const arr = [1, 2, 3, 4];

    return (
        <div>
            <h1 style={{ marginTop: "4rem" }}>Goods Available</h1>

            <CardGroup>
                {
                    arr.map(() => {
                        return <ProductCard />
                    })
                }
            </CardGroup>
        </div>
    )
}

export default TrackGoods;
