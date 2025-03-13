type LoadingButtonProps = {
    loading : boolean
    text : string
}
export default function LoadingButton({ loading, text } : LoadingButtonProps) {
    return (
        <input
            type="submit"
            value={loading ? text : text}
            disabled={loading}
            className={`bg-purple-950 hover:bg-purple-800 dark:bg-purple-700 w-full p-3 rounded-lg text-white font-black text-xl block ${loading ? "cursor-not-allowed bg-purple-300 hover:bg-purple-300 dark:bg-purple-400 dark:hover:bg-purple-400" : "cursor-pointer"}`}
        />
    )
}
