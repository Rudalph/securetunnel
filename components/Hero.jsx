import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    return (
        <div>
            <div className="hero lg:mt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                   <Image
      src="/shield.png"       
      alt="Shield"
      width={300}             
      height={300}             
      className="max-w-sm rounded-lg"
    />
                    <div>
                        <h1 className="text-5xl font-bold">Secure Tunnel</h1>
                        <p className="py-6">
                            Secure Tunnel ensures safe and confidential communication between client and server. It protects data integrity, prevents tampering, and guarantees that messages are sent and received securely.
                        </p>
                        <Link href='/main'><button className="btn btn-primary">Get Started</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero