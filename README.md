news-site-dynamic-content
=========================

This project shows two different approaches to dynamically create pages for news web sites. It has got responsive web page created with SCSS. The first approach uses javascript classical pattern with prototype inheritance to create the contents. The second approach uses the powerful closure pattern to create the web page. It shows how powerful the closure pattern is when used properly in right place.

Steps to run:
1). Copy all the content of this folder to a web server( e.g. <apache-server-path>/htdocs/news-test-site/ ).
2) launch the web server
3) open the page in the web server ( http://localhost:8080/<apache-server-path>/htdocs/news-test-site/ )
4) To test the dynamic test, modify the file data/news_dynamic_text.json & the changed text will be reflected after few seconds( 15 seconds ).