import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PiCalendarDotsThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, fetchNewsById } from "@/redux/landing/newsSlice";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const NewsPage = () => {
    const dispatch = useDispatch();
    const { selectedItem, newsItems } = useSelector((state) => state.news);
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [processedContent, setProcessedContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                await dispatch(fetchNewsById(id)).unwrap();
                await dispatch(fetchNews()).unwrap();
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedItem?.contentnews) {
            setProcessedContent(processImageUrls(selectedItem?.contentnews));
        }
    }, [selectedItem?.contentnews]);

    const processImageUrls = (content) => {
        const updatedContent = content.replace(
            /!\[([^\]]*)\]\((http:\/\/localhost:1337[^)]+)\)/g,
            (match, altText, url) => {
                const updatedUrl = url.replace("localhost", "10.10.102.91");
                return `<img src="${updatedUrl}" alt="${altText}" class="my-4 mx-auto w-3/4" />`;
            }
        );

        const paragraphs = updatedContent.split("\n\n");

        const formattedContent = paragraphs
            .map((paragraph, index) => {
                if (paragraph.startsWith("#")) {
                    const headerText = paragraph.slice(1).trim();
                    return `<p key=${index} class="paragraph text-3xl font-bold">${headerText}</p>`;
                }
                return `<p key=${index} class="paragraph">${paragraph}</p>`;
            })
            .join("");

        return formattedContent;
    };

    return (
        <div className="m-4 md:m-6">
            {isLoading && <div>Loading...</div>}

            {!isLoading && processedContent !== "" && (
                <>
                    <h1 className="text-4xl font-bold">
                        {selectedItem?.title}
                    </h1>
                    <div className="flex flex-row items-center mt-4 space-x-1">
                        <PiCalendarDotsThin style={{ color: "#3d3d3d" }} />
                        <h3 className="text-sm md:text-base">
                            {selectedItem?.createdAt.slice(0, 10)}
                        </h3>
                    </div>
                    <div className="flex flex-col lg:flex-row md:space-x-5 mt-10">
                        <div className="flex-1">
                            <img
                                src={selectedItem?.imageUrl}
                                alt={selectedItem?.title}
                                className="w-full h-auto"
                            />
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                remarkPlugins={[remarkGfm]}
                                className="mt-5 lg:text-lg text-justify"
                                components={{
                                    h1: ({ node, ...props }) => (
                                        <h1
                                            className="text-3xl font-bold mt-6 mb-4"
                                            {...props}
                                        />
                                    ),
                                }}
                            >
                                {processedContent}
                            </ReactMarkdown>
                        </div>
                        <div className="flex flex-col w-full lg:w-1/3 px-4 lg:px-10">
                            <div className="sticky top-20">
                                <div className="text-black mt-6 lg:mt-0 text-2xl lg:text-3xl font-semibold whitespace-nowrap">
                                    Latest News
                                </div>
                                {newsItems.slice(0, 3).map((item, index) => (
                                    <Link
                                        to={`/news/${item.documentId}`}
                                        className="flex flex-row space-x-4 lg:mt-5"
                                        key={index}
                                    >
                                        <div className="bg-primary w-2 h-14 my-1"></div>
                                        <div className="flex flex-col space-y-1">
                                            <h3 className="text-lg lg:text-xl font-medium">
                                                {item.title}
                                            </h3>
                                            <div className="flex flex-row items-center">
                                                <PiCalendarDotsThin
                                                    style={{ color: "#3d3d3d" }}
                                                />
                                                <p className="text-[#3d3d3d] text-xs">
                                                    {item.createdAt.slice(
                                                        0,
                                                        10
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {newsItems.length > 3 && (
                                    <Link to={`/news`}>
                                        <button className="bg-primary text-white rounded-2xl px-6 py-2 self-start textarea-md lg:text-lg mt-5">
                                            More News
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewsPage;
