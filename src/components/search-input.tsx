"use client"

import { SearchIcon, XIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRef, useState } from "react"

export const SearchInput = () => {
    const [value, setValue] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return (
        <div className="flex-1 flex items-center justify-center">
            <form 
                className="relative max-w-[720px] w-full"
            >
                <Input
                    value={value}
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Search"
                    className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"    
                />
                <Button
                    onClick={(e) => e.preventDefault()}
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full !bg-transparent !text-gray-700 !hover:bg-neutral-100/80 !border-none"
                >
                    <SearchIcon className="size-4" />
                </Button>
                {value && (
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            setValue("");
                            inputRef.current?.blur();
                        }}
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full !bg-transparent !text-gray-700 !hover:bg-neutral-100/80 !border-none"
                    >
                        <XIcon className="size-4" />
                    </Button>
                )}
            </form>
        </div>
    )
}