import { formatDate, limitText } from "@/utils/Utils";
import React from "react";
import { PiCalendarDotsThin } from "react-icons/pi";
import { Link } from "react-router-dom";

const NewsCard = ({ articles }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {articles.map((article) => (
                <Link
                    to={`/news/${article.documentId}`}
                    key={article.documentId}
                    className="flex flex-col p-2 bg-white border rounded-3xl"
                >
                    <div className="w-full h-72 rounded-t-2xl overflow-hidden">
                        <img
                            className="h-full w-full object-cover"
                            src={article.imageUrl}
                            alt={article.title}
                        />
                    </div>
                    <div className="flex flex-col min-h-40 px-1 pt-3 justify-between">
                        <h3 className="text-dark/90 lg:text-2xl font-bold">
                            {limitText(article.title, 10000)}
                        </h3>
                        <div className="flex items-center gap-1 justify-end">
                            <PiCalendarDotsThin
                                className="text-accent"
                                size={16}
                            />
                            <span className="text-dark/50 text-xs">
                                {formatDate(article.createdAt.slice(0, 10))}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NewsCard;
