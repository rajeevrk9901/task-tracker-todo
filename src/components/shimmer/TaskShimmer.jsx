import React from 'react'

const TaskShimmer = () => {
    return (

        <div className="flex flex-col gap-8">
            {Array(12).fill().map((_, i) => {
                return (
                    <div className="flex flex-col gap-8 animate-pulse">
                        <div className="mx-4 justify-between items-center px-4 py-2 flex gap-4 bg-red-200 cursor-grab shadow-md rounded-md relative">
                            <div className="font-serif flex items-center gap-2 w-96"></div>
                            <div className="font-sans text-xs text-blue-700"></div>
                            <div>
                                <button className="cursor-pointer lowercase bg-yellow-300 px-2 py-[1px]"></button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

    )
}

export default TaskShimmer