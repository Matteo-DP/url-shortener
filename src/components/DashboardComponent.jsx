import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import UrlInput from "./UrlInput";
import config from "../../config.json";

export default function DashboardComponent() {

    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(undefined);
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        setLoading(true)
        fetch("/api/url" + "?" + new URLSearchParams({
            uuid: currentUser.uid
        }))
            .then(res => res.json())
            .then(data => setData(data))
            .finally(() => setLoading(false))
    }, [currentUser.uid, refreshKey])

    const [hovering, setHovering] = useState(false);

    async function deleteRow(short) {
        await fetch("/api/url", {
            method: "DELETE",
            body: new URLSearchParams({
                short: short,
                uuid: currentUser.uid
            })
        })
        setRefreshKey(refreshKey + 1);
    }

    function refreshFunction() {
        setRefreshKey(refreshKey + 1)
    };

    if(!loading) {
        return (
            <div className='px-8 pb-8'>
                <h1 className='text-3xl text-accentpurple'>Dashboard</h1>

                <h1 className='text-2xl mt-8 mb-4'>Generate new shortened URL</h1>
                <UrlInput 
                    refreshFunction={refreshFunction}
                />

                <h1 className='text-2xl mt-8 mb-4'>My short URLs</h1>

                {data.length !== 0 ? 
                    <div className='p-4 bg-bgdarker rounded-lg'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b-2 border-bglight'>
                                <th className='text-start font-normal py-2 text-textdarker'>Short URL</th>
                                <th className='text-start font-normal py-2 text-textdarker'>Original URL</th>
                                <th className='text-start font-normal py-2 text-textdarker'>Creation date</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={row.short}
                                    onMouseOver={() => setHovering(index)}
                                    onMouseOut={() => setHovering(-1)} // -1 to prevent 0 == false
                                >
                                    <td className='py-4 px-2 text-accentpurple underline underline-offset-2 whitespace-nowrap'>
                                        <a target="_blank" rel="noreferrer" href={`${config.domainName}${row.short}`}>
                                            {config.domainName}{row.short}
                                        </a>
                                    </td>
                                    <td className='py-4 px-2 underline underline-offset-2 text-textdark'>
                                        <div className='text-ellipsis overflow-hidden whitespace-nowrap max-w-xl'>
                                            <a target="_blank" rel="noreferrer" href={row.url}>
                                                {row.url}
                                            </a>
                                        </div>
                                    </td>
                                    <td className='py-4 px-2 text-textdark'>28/12/2022</td>
                                    <td>
                                        <button onClick={() => deleteRow(row.short)}>
                                            <i className={`fa-solid fa-trash fa-xl text-accentred ${hovering == index ? "visible" : "invisible"}`}></i>
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='mt-4'>
                        <p className='text-textdark'>No short URLs</p>
                        <p className='text-textdarker'>Create your first short URL by inputting your long URL above and clicking the &quot;generate&quot; button.</p>
                    </div>
                }
            </div>
        )
    }
}
