import React, { useEffect, useState } from "react";
import { PiCalendarDotsThin } from "react-icons/pi";
import { cn, Pagination, PaginationItemType } from "@nextui-org/react";
import { ChevronIcon } from "./ChevronIcon";
import { Outlet, useNavigate } from "react-router-dom";
import NewsPage from "./NewsPage";
import NewsCard from "@/components/landing/NewsCard";

const News = () => {
  const navigate = useNavigate();
  const newsArticles = [
    {
      id: 1,
      title: "News Article 1",
      date: "10 November 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
      imageUrl:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
    {
      id: 2,
      title: "News Article 2",
      date: "10 November 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
      imageUrl:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Calculate the index of the last and first article on the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  // Get the current articles to display
  const currentArticles = newsArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleArticleClick = (article) => {
    navigate(`/news/${article.id}`, { state: { article } });
  };


  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={() => {
            if (
              currentPage < Math.ceil(newsArticles.length / articlesPerPage)
            ) {
              handlePageChange(currentPage + 1);
            }
            onNext();
          }}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
            onPrevious();
          }}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive && "text-white bg-[#e17052] font-bold"
        )}
        onClick={() => {
          handlePageChange(value);
          setPage(value);
        }}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4">
      <div>
        <h1 className="text-4xl font-semibold">News</h1>

        {/* ini card */}
        <NewsCard articles={currentArticles} handleArticleClick={handleArticleClick} />
      </div>
      <div>
        <div className="mt-auto flex justify-center">
          <Pagination
            css={{
              button: {
                "&:hover": {
                  backgroundColor: "#e17052",
                },
              },
            }}
            disableCursorAnimation
            showControls
            total={Math.ceil(newsArticles.length / articlesPerPage)}
            initialPage={currentPage}
            className="gap-2 mt-6"
            radius="full"
            renderItem={renderItem}
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};

export default News;
