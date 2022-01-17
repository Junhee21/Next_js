import { useRouter } from "next/router";
import { useState } from "react";

export default function HomePage() {
    const [cnt, setCnt] = useState();
    const router = useRouter();
    
    return (
        <>
            <div style={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <textarea
                    value = {cnt}
                    onChange = {(e) => setCnt(e.target.value)}
                    style = {{height:'120px', fontSize:'90px', width:'200px'}}
                />
                <button
                    onClick={() => router.push(
                        {pathname: "/rsp/game", query:{cnt:cnt}})}
                    style={{ fontSize: '100px' }}
                >Go Rsp!</button>
            </div>
        </>
    )
}