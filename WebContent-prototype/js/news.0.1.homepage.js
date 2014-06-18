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
					var NewsListGenerator = function(newsListOption) {

						this.containerObjId = "#"
								+ newsListOption.containerObjId;

						/*
						 * default list size is 10
						 */
						this.numberOfItemsToDisplay = newsListOption.numberOfItemsToDisplay || 10;

						this.url = newsListOption.url
								|| "data/most_popular_news.json";

						this.type = newsListOption.type || "GET";

						this.dataType = newsListOption.dataType || "JSON";

					}
					/*
					 * Generates the list by calling jquery ajax function
					 */
					NewsListGenerator.prototype.generateList = function() {
						$.ajax({
							url : this.url,
							type : this.type,
							dataType : this.dataType,
							context : this,
							success : this.successCallback,
							error : this.errorCallback
						});

					}
					/*
					 * configOptions : helper function to set the configuration
					 * properties to the list generator
					 * 
					 */
					NewsListGenerator.prototype.configOptions = function(
							newsListOption) {
						if (newsListOption.containerObjId !== 'undefined') {
							this.containerObjId = "#"
									+ newsListOption.containerObjId;
						}
						/*
						 * default list size is 10
						 */
						if (newsListOption.numberOfItemsToDisplay !== 'undefined') {
							this.numberOfItemsToDisplay = newsListOption.numberOfItemsToDisplay || 10;
						}
						if (newsListOption.url !== 'undefined') {
							this.url = newsListOption.url;
						}
						if (newsListOption.type !== 'undefined') {
							this.type = newsListOption.type || "GET";
						}
						if (newsListOption.dataType !== 'undefined') {
							this.dataType = newsListOption.dataType || "JSON";
						}
					}

					/*
					 * success callback of Ajax *
					 */
					NewsListGenerator.prototype.successCallback = function(data) {
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
					NewsListGenerator.prototype.errorCallback = function() {

						// alert('error callback');
					}
					// Generate "Most Popular News" list
					newsListGenerator_namespace.newsListOption = {
						containerObjId : "list-most-popular-news",
						numberOfItemsToDisplay : 10,
						url : "data/most_popular_news.json ",
						type : "GET",
						dataType : "JSON"
					};
					var most_popular_news_list_generator = new NewsListGenerator(
							newsListGenerator_namespace.newsListOption);
					most_popular_news_list_generator.generateList();

					newsListGenerator_namespace.newsListOption = {
						containerObjId : "list-most-popular-blog",
						url : "data/most_popular_blog.json ",
						dataType : "JSON"
					};
					var most_popular_blog_list_generator = new NewsListGenerator(
							newsListGenerator_namespace.newsListOption);
					most_popular_blog_list_generator.generateList();

					newsListGenerator_namespace.newsListOption = {
						containerObjId : "list-most-popular-news-short",
						numberOfItemsToDisplay : 5,
						url : "data/most_popular_news.json ",
						type : "GET"
					};
					var most_popular_news_list_generator_short_list = new NewsListGenerator(
							newsListGenerator_namespace.newsListOption);
					most_popular_news_list_generator_short_list.generateList();

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