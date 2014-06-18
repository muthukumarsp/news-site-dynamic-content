$(document)
		.ready(
				function() {
					var newsListGenerator_namespace = {};
					/*
					 * Constructor function : creates a new object with the
					 * supplied properties. @param newsListOption - object
					 * containing the configuration properties. Refer the
					 * newsListGenerator_namespace.newsListOption for more
					 * details @return none
					 * 
					 */
					var newsListGenerator = function(newsListOption) {

						/*
						 * Generates the list by calling jquery ajax function.
						 * A javascript closure is created in the following chunk. 
						*/
						newsListOption.numberOfItemsToDisplay = newsListOption.numberOfItemsToDisplay || 10;
						var generateList = function() {
							$.ajax({
								url : newsListOption.url || "data/most_popular_news.json",
								type : newsListOption.type || "GET",
								dataType : newsListOption.dataType || "JSON",
								context : newsListOption,
								success : successCallback,
								error : errorCallback
							});

						}
						return generateList;
					}

					/*
					 * success callback of Ajax *
					 */
					 successCallback = function(data) {
						var most_popular_item_list = data.most_popular_new_list;
						var count = 0;
						/*
						 * Append the <li> elements to a <div> and finally
						 * modify the DOM.. This will improve the performance
						 */
						var $objTempDiv = $('<div></div>');
						for (news_item in most_popular_item_list) {
							$($objTempDiv)
									.append(
											" <li> <a href="
													+ most_popular_item_list[news_item].news_url
													+ ">"
													+ most_popular_item_list[news_item].news_heading
													+ "</a> </li>");
							if (++count >= this.numberOfItemsToDisplay) {
								break;
							}
						}

						$(this.containerObjId).append($objTempDiv);
					}
					/*
					 * errorCallback : Ajax error handling is done
					 */
					errorCallback = function() {

						// alert('error callback');
					}
					// Generate "Most Popular News" list
					newsListGenerator_namespace.newsListOption = {
						containerObjId : "#list-most-popular-news",
						numberOfItemsToDisplay : 10,
						url : "data/most_popular_news.json ",
						type : "GET",
						dataType : "JSON"
					};
					var most_popular_news_list_generator = newsListGenerator(
							newsListGenerator_namespace.newsListOption);
					//Inner function is called now. Javascript Closure takes care of the context here.
					most_popular_news_list_generator();

					newsListGenerator_namespace.newsListOption = {
						containerObjId : "#list-most-popular-blog",
						url : "data/most_popular_blog.json ",
						type : "GET",
						dataType : "JSON"
					};
					most_popular_news_list_generator = newsListGenerator(
							newsListGenerator_namespace.newsListOption);
					//Inner function is called now. Javascript Closure takes care of the context here.
					most_popular_news_list_generator();
										 
					 newsListGenerator_namespace.newsListOption = {
						containerObjId : "#list-most-popular-news-short",
						numberOfItemsToDisplay : 5,
						url : "data/most_popular_news.json ",
						type : "GET"
					};
					most_popular_news_list_generator = newsListGenerator(
							newsListGenerator_namespace.newsListOption);
					//Inner function is called now. Javascript Closure takes care of the context here.
					most_popular_news_list_generator();
					
					/*
					 * This function fetches the text dynamically from the on
					 * the specified interval and updates th content.
					 */
					newsListGenerator_namespace.dynamicNewsUpdate = function() {
						$
								.ajax({
									url : "data/news_dynamic_text.json",
									success : function(data) {
										 
											$(".content-heading h5").text(
													data.dynamic_text_content);
										setTimeout(
												newsListGenerator_namespace.dynamicNewsUpdate,
												15000);
									},

									error : function(jqXHR, textStatus,
											errorThrown) {
										// error handling goes here
										setTimeout(
												newsListGenerator_namespace.dynamicNewsUpdate,
												15000);
									},
									type : "GET",
									dataType : "JSON"
								});
					}

					/*
					 * call back function to handle dynamic text from the
					 * server. It again calls the raises the ajax request after
					 * a specified interval
					 */
					newsListGenerator_namespace.dynamicNewsUpdate();
				});