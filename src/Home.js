import React from 'react';
import "./Home.css";
import Product from './Product';
function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img className = "home_image" src=
                "https://images-na.ssl-images-amazon.com/images/G/15/digital/video/merch/2021/TV/BRND/BRND_MTH21_00000_GWBleedingHero_1500x600_POST_Final_en-CA_ENG_PVD6645._CB660540763_.jpg"
                 alt =""/> 
            
                <div className="home_row">
                    <Product 
                        id = "12321341"
                        title="The Lean Startup" 
                        price ={29.99} 
                        image= "https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
                        rating={3}
                    />
                    <Product
                        id="45938094"
                        title="Kenwood kmix for baking"
                        price={239.0}
                        rating={4}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kenwood-kmix-editions-kmx761gd-mixer-kitchen-machine-bg-1563963977.png?crop=0.5xw:1xh;center,top&resize=480:*"
                    />
                </div>

                <div className="home_row">
                    <Product 
                         id="4903850"
                         title="Samsung LDG Game Monitor"
                         price={199.99}
                         rating={3}
                         image="https://img.global.news.samsung.com/my/wp-content/uploads/2017/12/123.jpg"
                    
                    />
                    <Product 
                         id="23445930"
                         title="大蛇丸手办"
                         price={399.99}
                         rating={5}
                         image="https://img.alicdn.com/img/bao/uploaded/i4/i2/793032368/O1CN01DoF5OU1TMaX7JrKbD_!!793032368.jpg_540x540Q50s50.jpg"
                    />
                    <Product 
                        id="32556847"
                        title="猫砂盆"
                        price={99.99}
                        rating={5}
                        image="https://m.media-amazon.com/images/I/81y1HEWX69L._AC_SX679_.jpg"
                    />
                </div>

                <div className="home_row">
                    <Product 
                        id="32556847"
                        title="大彩电"
                        price={548.99}
                        rating={2}
                        image="https://m.media-amazon.com/images/I/61W8Stul3wL._AC_SX679_.jpg"
                    
                    />
                </div>
            
            </div>
        </div>
    )
}

export default Home
