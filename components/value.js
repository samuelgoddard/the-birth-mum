export default function Value({title, text}) {
    return(
        <div className="flex flex-col p-4 justift-start md:w-1/3 xl:p-12">
            <p className="mb-3 leading-relaxed tracking-widest uppercase sm:text-lg">{title}</p>
            <p className="opacity-75">{text}</p>
        </div>
    )
}