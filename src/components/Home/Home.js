import React from 'react'
import Navbar1 from './Navbar1';
import './Home.css';
import {Carousel} from 'react-bootstrap'
import i1 from './carouselimages/offer1.jpg'
import i2 from './carouselimages/offer2.jpg'
import i3 from './carouselimages/offer3.jpg'

const Home = () => {
    return (
        <div style={{marginTop:"6rem"}}>
           

            <div style={{ padding: '10px' }}>
                <Carousel variant='dark' style={{ width: '100%' }}>
                    <Carousel.Item interval={2000}>
                        <img src={i1} style={{ height: '70vh', width: '100%' }} />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img src={i2} style={{ height: '70vh', width: '100%' }} />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img src={i3} style={{ height: '70vh', width: '100%' }} />
                    </Carousel.Item>
                </Carousel>

            </div>

            <div className="hometxt">

                2. The SCM 4.0
                PROBLEM STATEMENTS
                * Kindly note these are only “suggested features” you are free to use any or all of them along with
                additional features of your own, as brownie points will be provided for creativity.
                Platform for crowdfunding.
                Taking up volunteer roles and enabling a platform to book slots for
                conducting seminar/workshops/awareness drives.
                Find the nearest NGO/Old-age home/Orphanage according to the user’s
                location for donation, adoption and any other such requirements eg:
                through chatbot. (User should be able to filter out NGO according to its
                needs)
                Make facilities for blind people by enabling a voice based interface.
                Blog-feed about fundraiser type events in the vicinity.
                Potential Features:
                NGOs play a vital role in assisting the common people and the government in
                order to achieve their legitimate requests, as well as attempting to assist
                needy folks in any manner feasible. Environmental, social, advocacy, and
                human rights work are just some few instances of NGO activities. As an NGO,
                they encounter several challenges, ranging from raising funds to recruiting
                volunteers for their initiatives.
                To supplement the smooth functioning of NGOs , develop an application for
                controlled management and progressive growth of such Non-Profitable
                Government Organizations.
                To solve this problem, you need to develop a website/application which
                enables businesses to manage order, inventory control, logistic analysis and
                demand planning.

            </div>


        </div>
    )
}

export default Home
