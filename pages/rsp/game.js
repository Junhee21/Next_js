import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function GamePage() {
    const router = useRouter();

    const [result, setResult] = useState([]);
    const [totalGame, setTotalGame] = useState(Number(router.query.cnt));
    const [nowGame, setNowGame] = useState(0);

    const [cnt, setCnt] = useState(3);
    const [my, setMy] = useState();
    const [computer, setComputer] = useState(Math.floor(Math.random()*3));
    const [timer, setTimer] = useState();

    const judge = () => {
        if (my === computer) {
            result[nowGame] = '무';
        } else if ((my-computer === -1) || (my-computer===2)) {
            result[nowGame] = '승';
        } else {
            result[nowGame] = '패';
        }
    }

    useEffect(() => {
        const temp = new Array(totalGame).fill('X');
        setResult(temp);
    }, [])

    useEffect(() => {
        timer = setInterval(function test() {setCnt(cnt => cnt-1)}, 1000)
        setTimer(timer)
        setComputer(Math.floor(Math.random()*3));
        if (nowGame == totalGame) {
            clearInterval(timer)
        }
    }, [nowGame])

    useEffect(() => {
        if (cnt<0) {
            clearInterval(timer)
            judge()
            setNowGame(nowGame => nowGame+1)
            setCnt(3)
        }
    }, [cnt])

    return (
        <>
            {result.map((obj, index) => {
                return <div>
                    {obj}
                </div>
            })}
            <div>
                {cnt}
            </div>

            <button onClick={() => setMy(0)}>묵</button>
            <button onClick={() => setMy(1)}>찌</button>
            <button onClick={() => setMy(2)}>빠</button>
            <div>{my}</div>
            <br/>
            {(computer === 0) && <div>묵</div>}
            {(computer === 1) && <div>찌</div>}
            {(computer === 2) && <div>빠</div>}
        </>
    )
}