export default function Value({title, text}) {
    return(
        <div className="p-4 md:w-1/3 xl:w-1/4 xl:p-12">
            <p className="mb-3 leading-relaxed tracking-widest uppercase sm:text-lg">{title}</p>
            <p className="opacity-75">{text}</p>
        </div>
    )
}