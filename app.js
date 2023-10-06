const express=require("express");
const axios=require("axios");
const _=require("lodash");
const app=express();

const apiUrl="https://intent-kit-16.hasura.app/api/rest/blogs";
const admirKey="32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6";

app.get("/",function(req,res){
  res.redirect("/api/blog-stats");
});

app.get('/api/blog-stats',async function(req, res){
  let blogData;
  try{
    const response = await axios.get(apiUrl, {
      headers: {
        'x-hasura-admin-secret': admirKey,
      },
    });

    blogData = response.data;
    console.log(blogData);
    // Continue with data analysis and response (see step 2 below)
  } catch (error) {
    console.error('Error fetching blog data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  const totalBlogData=blogData.length;

  const longestBlog = _.maxBy(blogData, 'title.length');


  const blogsWithPrivacy = _.filter(blogData, (blog)=>_.includes(_.toLower(blog.title), 'privacy'));

const uniqueBlogTitles = _.uniqBy(blogData, 'title');

const statistics = {
 totalBlogData,
 longestBlog: longestBlog.title,
 blogsWithPrivacy: blogsWithPrivacy.length,
 uniqueBlogTitles: uniqueBlogTitles.map((blog) => blog.title),
};

res.json(statistics);
});

app.get('/api/blog-search', (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const searchResults = blogData.filter((blog) =>
    _.includes(_.toLower(blog.title), _.toLower(query))
  );

  res.json(searchResults);
});



app.listen(3000,function(req,req){
  console.log("listening to port 3000");
});
