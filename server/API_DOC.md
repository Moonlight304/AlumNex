# Server API Routes

## Authentication

### 1. Signup Route

**URL:** `/auth/signup`

**Method:** `POST`

**Description:** Registers a new user as either a Student or Alumni.

**Request Body:**

* `userType` : (String, Required) Specifies whether the user is a "Student" or "Alumni".
* `username` : (String, Required) The desired username for the account.
* `password` : (String, Required) The password for the account.
* `confirmPassword` : (String, Required) Should match the password field.
* `email` : (String, Required) The email address for the user.
* If userType is "Student":
    - `branch` : (String, Required) The branch/department of study.
* If userType is "Alumni":
    - `gradYear` : (String, Required) Graduation year.
    - openToMentor (Boolean, Required) Indicates whether the alumni is open to mentoring.
    - `mentorPitch` : (String, Optional): A brief pitch or statement for potential mentees.


**Response Structure:**

- **Success:**
``` 
    {
        status: 'success',
        message: 'Signup successful.',
        jwt_token: <jwt_token>
    }
``` 

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 2. Login Route

**URL:** `/auth/login`

**Method:** `POST`

**Description:** Authenticates a user and issues a JWT token.

**Request Parameters:**

* `userType` : (String, Required) Specifies whether the user is a "Student" or "Alumni".
* `username` : (String, Required) The username for the account.
* `password` : (String, Required) The password for the account.


**Response Structure:**

- **Success:**
```
    {
        status: 'success',
        message: 'Logged in successfully',
        jwt_token: <jwt_token>
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

---

## Feed Management

### 1. Fetch All Posts in feed

**URL:** `/feed`  

**Method:** `GET`  

**Description:** Fetches all posts in the feed, optionally filtering based on tags. The posts are returned in reverse chronological order.

**Request Parameters:**

* `filters` : (String, Optional, Query parameters) `['success story', 'achievement', 'article']`


**Response Structure:**
- **Success:**
```
    {
        status: "success",
        count: <number_of_posts>,
        data: [<list_of_posts>]
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 2. Fetch single post

**URL:** `/feed/:feedPostID`  

**Method:** `GET`  

**Description:**  Retrieves a single post by its ID.

**Request Parameters:**

* `feedPostID` : (String, Required) The ID of the post to retrieve.

**Response Structure:**

- **Success:**
```
    {
        status: 'success',
        post: <post_object>,
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 3. Create a new post

**URL:** `/feed/newPost`  

**Method:** `POST`  

**Description:**   Creates a new post in the feed.

**Request Parameters:**

* `content` : (String, Required) The content of the post.
* `tag` : (String, Required) `['success story', 'achievement', 'article']`

**Response Structure:**

- **Success:**
```
    {
        status: 'success',
        message: 'Posted successfully',
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 4. Edit a Post

**URL:** `/feed/editPost/:feedPostID`  

**Method:** `POST`

**Description:** Edits the content or tag of an existing post.

**Request Parameters:**

* `feedPostID` (String, Required): The ID of the post to edit.

**Request Body:**

* `newContent` : (String, Required) The updated content.
* `newTag` : (String, Required) The updated tag.

**Response Structure:**

- **Success:**
```
    {
        status: 'success',
        message: 'Edited Post'
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 5. Delete a Post

**URL:** `/feed/deletePost/:feedPostID`  

**Method:** `DELETE`

**Description:** Deletes a feedpost by its ID.

**Request Parameters:**

* `feedPostID` :  (String, Required) The ID of the post to delete.

**Response Structure:**

- **Success:**
```
    {
        status: 'success',
        message: 'Deleted post successfully'
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 6. Like a Post

**URL:** `/feed/like/:feedPostID`  

**Method:** `GET`

**Description:** Likes a feedpost by its ID.

**Request Parameters:**

* `feedPostID` : (String, Required) The ID of the post to like.

**Response Structure:**

- **Success:**
```
    {
        status: "success",
        message: "Incremented like count",
        newLikeCount: <like_count_after_increment>
    }

```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 7. Dislike a Post

**URL:** `/feed/dislike/:feedPostID`  

**Method:** `GET`

**Description:** Dislikes a post by its ID.

**Request Parameters:**

* `feedPostID` : (String, Required) The ID of the post to dislike.

**Response Structure:**

- **Success:**
```
    {
        status: "success",
        message: "Decremented like count",
        newLikeCount: <like_count_after_decrement>
    }

```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 8. Check If a Post is Liked

**URL:** `/feed/checkLiked/:feedPostID`  

**Method:** `GET`


**Description:** Checks if the authenticated user has liked a specific post.
**Request Parameters:**

* `feedPostID` : (String, Required) The ID of the post.

**Response Structure:**

- **Success:**
```
    {
        status: "success",
        liked: "<true_or_false>"
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 9. Fetch Comments for a Post

**URL:** `/feed/:feedPostID/comments`  

**Method:** `GET`

**Description:** Retrieves all comments for a specific post.

**Request Parameters:**

* `feedPostID` : (String, Required) The ID of the post.

**Response Structure:**

- **Success:**
```
    {
        status: "success",
        comments: [<list_of_comments>]
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 10. Add a New Comment to a Post

**URL:** `/feed/:feedPostID/comments/newComment`  

**Method:** `POST`

**Description:** Adds a new comment to a specific post.

**Request Parameters:**

* `feedPostID` : (String, Required) The ID of the post.

**Request Body:**

* `newComment` : (String, Required) The content of the comment.

**Response Structure:**

- **Success:**
```
    {
        status: "success",
        message: "Saved comment"
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

### 11. Delete a Comment

**URL:** `/feed/:feedPostID/comments/deleteComment/:commentID`  

**Method:** `DELETE`

**Description:** Deletes a comment by its ID.

**Request Parameters:**

* `feedPostID` : (String, Required) The ID of the post.
* `commentID` : (String, Required) The ID of the comment to delete.

**Response Structure:**

- **Success:**
```
    {
        status: 'success',
        message: 'Comment deleted successfully',
    }
```

- **Fail:**
```
    {
        status: 'fail',
        message: <error_message>
    }
```

---

## Job

### 1. Get All Jobs

**URL:** `/jobs`  

**Method:** `GET`  

**Description:** Retrieves all job postings, optionally filtered by tags.  

**Query Parameters:**

* `filters` : (String, Optional) `['full time', 'remote', 'internship', 'hybrid']`

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        count: <number_of_jobs>,
        data: [<job_objects>]
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 2. Get All Mentors

**URL:** `/jobs/mentors`  

**Method:** `GET`

**Description:** Retrieves all alumni who are open to mentoring.


**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        count: <number_of_mentors>,
        data: [<alumni_objects>]
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 3. Get Job by 

**URL:** `/jobs/:jobID`  

**Method:** `GET`  

**Description:** Retrieves a specific job posting by its ID.  

**Request Parameters:**

* `jobID` : (String, Required) The ID of the job to retrieve.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        job: <job_object>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 4. Post a New Job

**URL:** `/jobs/newJob`  

**Method:** `POST`  

**Description:** Creates a new job posting. Only users with the `Alumni` type can post jobs.  

**Request Body:**

* `title` : (String, Required) Title of the job.
* `company` : (String, Required) Company offering the job.
* `location` : (String, Required) Job location.
* `description` : (String, Required) Description of the job.
* `requirements` : (String, Required) Job requirements.
* `tag` : (String, Required) `['full-time', 'remote', 'internship', 'hybrid']`

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: Posted job successfully
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 5. Edit a Job

**URL:** `/jobs/editJob/:jobID`  

**Method:** `POST`  

**Description:** Edits an existing job posting by its ID. Only the original poster can edit the job.  

**Request Parameters:**

* `jobID` : (String, Required) The ID of the job to edit.  

**Request Body:**

* `newTitle` : (String, Required) New title for the job.
* `newCompany` : (String, Required) New company for the job.
* `newLocation` : (String, Required) New location for the job.
* `newDescription` : (String, Required) New description for the job.
* `newTag` : (String, Required) New tag for the job.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: Edited job successfully
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 6. Delete a Job

**URL:** `/jobs/deleteJob/:jobID`  

**Method:** `DELETE`  

**Description:** Deletes a job posting by its ID. Only the original poster can delete the job.  

**Request Parameters:**

* `jobID` : (String, Required) The ID of the job to delete.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: Deleted job successfully
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

---

## Donations

### 1. Get Top Donors

**URL:** `/donations`  

**Method:** `GET`  

**Description:** Retrieves all alumni sorted by their donation amounts in descending order.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        topDonors: [<alumni_objects>]
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 2. Make a Donation

**URL:** `/donations/makeDonation`  

**Method:** `POST`  

**Description:** Allows alumni to make a donation. Only users with the `Alumni` type can donate.
**Request Body:**

* `donationAmount` : (Number, Required) The amount to donate. Must be greater than 0.

**Response Structure:**

- **Success:**

    ```
    {
        status: success,
        message: Donated successfully!
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


---

## Events Mangament

### 1. Get All 

**URL:** `/events`  

**Method:** `GET`  

**Description:** Retrieves all events, optionally filtered by tags.  

**Query Parameters:**

* `filters` : (String, Optional) `['social', 'career', 'get-together']`

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        count: <number_of_events>,
        data: [<event_objects>]
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 2. Get Event by ID

**URL:** `/events/:eventID`  

**Method:** `GET`  

**Description:** Retrieves a specific event by its ID.  

**Request Parameters:**

* `eventID` : (String, Required) The ID of the event to retrieve.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        data: <event_object>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 3. Create a New Event

**URL:** `/events/newEvent`  

**Method:** `POST`  

**Description:** Creates a new event.  

**Request Body:**

* `name` : (String, Required) Name of the event.
* `start` : (Date, Required) Start date and time of the event.
* `end` : (Date, Required) End date and time of the event.
* `venue` : (String, Required) Venue of the event.
* `description` : (String, Required) Description of the event.
* `schedule` : (String, Required) Event schedule.
* `tag` : (String, Required) `['social', 'career', 'get-together']`
* `speakers` : (Array, Optional) List of speakers at the event.
* `sponsors` : (Array, Optional) List of sponsors for the event.

**Response Structure:**

- **Success:**

    ```
    {
        status: success,
        message: Created a new event,
        data: <event_id>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 4. Edit an Event

**URL:** `/events/editEvent/:eventID`  

**Method:** `POST`  

**Description:** Edits an existing event by its ID.  

**Request Parameters:**

* `eventID` : (String, Required) The ID of the event to edit.  

**Request Body:**

* `newName` : (String, Required) New name of the event.
* `newStart` : (Date, Required) New start date and time.
* `newEnd` : (Date, Required) New end date and time.
* `newVenue` : (String, Required) New venue.
* `newDescription` : (String, Required) New description.
* `newSchedule` : (String, Required) New schedule.
* `newTag` : (String, Required) New tag.
* `newSpeakers` : (Array, Optional) New list of speakers.
* `newSponsors` : (Array, Optional) New list of sponsors.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: Edited event
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 5. Delete an Event

**URL:** `/events/deleteEvent/:eventID`  

**Method:** `DELETE`  

**Description:** Deletes an event by its ID.  

**Request Parameters:**

* `eventID` : (String, Required) The ID of the event to delete.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: deleted event successfully
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 6. Join an Event

**URL:** `/events/joinEvent/:eventID`  

**Method:** `GET`  

**Description:** Allows a user to enroll in an event.  

**Request Parameters:**

* `eventID` : (String, Required) The ID of the event to join.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: Enrolled in event
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 7. Leave an Event

**URL:** `/events/leaveEvent/:eventID`  

**Method:** `GET`  

**Description:** Allows a user to unenroll from an event.  

**Request Parameters:**

* `eventID` : (String, Required) The ID of the event to leave.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: Disenrolled from event
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


--- 

## Community Management

### 1. Get User's Communities

**URL:** `/community`  

**Method:** `GET`  

**Description:** Retrieves the communities a user is part of.  

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        count: <number_of_communities>,
        data: [<community_objects>]
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 2. View Community

**URL:** `/community/:communityID`  

**Method:** `GET`  

**Description:** Retrieves a specific community by its ID.

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community to retrieve.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        data: <community_object>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 3. Create New Community

**URL:** `/community/newCommunity`  

**Method:** `POST`  

**Description:** Creates a new community.  

**Request Body:**

* `name` : (String, Required) Name of the community.
* `description` : (String, Required) Description of the community.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        data: <community_id>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 4. Edit Existing Community

**URL:** `/community/editCommunity/:communityID`  

**Method:** `POST`  

**Description:** Edits an existing community by its ID.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community to edit.  

**Request Body:**

* `newName` : (String, Required) New name of the community.
* `newDescription` : (String, Required) New description of the community.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        data: <community_id>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 5. Join a Community

**URL:** `/community/joinCommunity/:communityID`  

**Method:** `GET`  

**Description:** Allows a user to join a community.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community to join.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: Joined community
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```


### 6. Leave a Community

**URL:** `/community/leaveCommunity/:communityID`  

**Method:** `GET`  

**Description:** Allows a user to leave a community.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community to leave.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: Left community
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

---

## Community Posts Management

### 1. Get All Posts of a 

**URL:** `/community/posts/:communityID`  

**Method:** `GET`  

**Description:** Retrieves all posts of a specific community, optionally filtered by tags. 

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community to retrieve posts from.
* `filters` : (String, Optional) Comma-separated list of tags to filter posts by.

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        count: <number_of_posts>,
        data: [<post_objects>]
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 2. View a Specific Post

**URL:** `/community/posts/:communityID/:communityPostID`  

**Method:** `GET`  

**Description:** Retrieves a specific post by its ID.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community the post belongs to.
* `communityPostID` : (String, Required) The ID of the post to retrieve.

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        post: <post_object>
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 3. Create a New Post

**URL:** `/community/posts/:communityID/newPost`  

**Method:** `POST`  

**Description:** Creates a new post in the specified community.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community where the post will be created.
* `content` : (String, Required) The content of the new post.
* `tag` : (String, Required) `['question', 'resources', 'roadmaps']`

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        message: Posted successfully
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 4. Edit an Existing Post

**URL:** `/community/posts/:communityID/editPost/:communityPostID`  

**Method:** `POST`  

**Description:** Edits an existing post by its ID.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community the post belongs to.
* `communityPostID` : (String, Required) The ID of the post to edit.
* `newContent` : (String, Required) The new content for the post.
* `newTag` : (String, Required) `['question', 'resources', 'roadmaps']`

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        message: Edited CommunityPost
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 5. Delete a Post

**URL:** `/community/posts/:communityID/deletePost/:communityPostID`  

**Method:** `DELETE`  

**Description:** Deletes a specific post by its ID.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community the post belongs to.
* `communityPostID` : (String, Required) The ID of the post to delete.

**Response Structure:**

- **Success:**

    ``` 
    {
        status: success,
        message: Deleted post successfully
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 6. Like a Post

**URL:** `/community/posts/:communityID/like/:communityPostID`  

**Method:** `GET`  

**Description:** Allows a user to like a post.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community the post belongs to.
* `communityPostID` : (String, Required) The ID of the post to like.

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        message: Incremented like count,
        newLikeCount: <new_like_count>
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 7. Dislike a Post

**URL:** `/community/posts/:communityID/dislike/:communityPostID`  

**Method:** `GET`  

**Description:** Allows a user to dislike a post.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community the post belongs to.
* `communityPostID` : (String, Required) The ID of the post to dislike.

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        message: Decremented like count,
        newLikeCount: <new_like_count>
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 8. Check If Post Is Liked

**URL:** `/community/posts/:communityID/:communityPostID/checkLiked`  

**Method:** `GET`  

**Description:** Checks if a user has liked a specific post.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community the post belongs to.
* `communityPostID` : (String, Required) The ID of the post to check.

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        liked: <true_or_false>
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 9. Get Comments of a Post

**URL:** `/community/posts/:communityID/:communityPostID/comments`  

**Method:** `GET`  

**Description:** Retrieves all comments for a specific post.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community the post belongs to.
* `communityPostID` : (String, Required) The ID of the post to retrieve comments for.

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        message: Fetched all comments for post,
        comments: [<comment_objects>]
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 10. Add a Comment to a Post

**URL:** `/community/posts/:communityID/:communityPostID/comments/newComment`  

**Method:** `POST`  

**Description:** Adds a new comment to a specific post.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community the post belongs to.
* `communityPostID` : (String, Required) The ID of the post to comment on.
* `newComment` : (String, Required) The content of the new comment.

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        message: Saved comment
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

### 11. Delete a Comment

**URL:** `/community/posts/:communityID/:communityPostID/comments/deleteComment/:commentID`  

**Method:** `DELETE`  

**Description:** Deletes a specific comment from a post.  

**Request Parameters:**

* `communityID` : (String, Required) The ID of the community the post belongs to.
* `communityPostID` : (String, Required) The ID of the post the comment is on.
* `commentID` : (String, Required) The ID of the comment to delete.

**Response Structure:**

- **Success:**
    ``` 
    {
        status: success,
        message: Comment deleted successfully
    }
    ```
- **Fail:**
    ``` 
    {
        status: fail,
        message: <error_message>
    }
    ```

---

## Venture Management

### 1. Get All Ventures

**URL:** `/ventures`  

**Method:** `GET`  

**Description:** Retrieves all ventures sorted by like count.  

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        data: [<venture_objects>]
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

### 2. View Venture

**URL:** `/ventures/:ventureID`  

**Method:** `GET`  

**Description:** Retrieves a specific venture by its ID. 

**Request Parameters:**

* `ventureID` : (String, Required) The ID of the venture to retrieve.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        data: <venture_object>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

### 3. Create New Venture

**URL:** `/ventures/newVenture`  

**Method:** `POST`  

**Description:** Creates a new venture. Only user with `Student` type can create new ventures.

**Request Body:**

* `title` : (String, Required) Title of the venture.
* `description` : (String, Required) Description of the venture.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        data: <venture_object>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

### 4. Edit Existing Venture

**URL:** `/ventures/editVenture/:ventureID`  

**Method:** `POST`  

**Description:** Edits an existing venture by its ID.  

**Request Parameters:**

* `ventureID` : (String, Required) The ID of the venture to edit.  

**Request Body:**

* `newTitle` : (String, Required) New title of the venture.
* `newDescription` : (String, Required) New description of the venture.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: 'edited venture'
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

### 5. Delete Venture

**URL:** `/ventures/deleteVenture/:ventureID`  

**Method:** `DELETE`  

**Description:** Deletes a venture by its ID.  

**Request Parameters:**

* `ventureID` : (String, Required) The ID of the venture to delete.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: 'deleted venture'
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

### 6. Like a Venture

**URL:** `/ventures/like/:ventureID`  

**Method:** `GET`  

**Description:** Allows a user to like a venture.  

**Request Parameters:**

* `ventureID` : (String, Required) The ID of the venture to like.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: 'Incremented like count',
        newLikeCount: <new_like_count>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

### 7. Dislike a Venture

**URL:** `/ventures/dislike/:ventureID`  

**Method:** `GET`  

**Description:** Allows a user to dislike a venture.  

**Request Parameters:**

* `ventureID` : (String, Required) The ID of the venture to dislike.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: 'Decremented like count',
        newLikeCount: <new_like_count>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

### 8. Check If Liked

**URL:** `/ventures/:ventureID/checkLiked`  

**Method:** `GET`  

**Description:** Checks if the user has liked a specific venture.  

**Request Parameters:**

* `ventureID` : (String, Required) The ID of the venture to check.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        liked: <true_or_false>
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```

### 9. Invest in a Venture

**URL:** `/ventures/invest/:ventureID`  

**Method:** `POST`  

**Description:** Allows an Alumni to invest in a venture.  

**Request Parameters:**

* `ventureID` : (String, Required) The ID of the venture to invest in. 

**Request Body:**

* `investAmount` : (Number, Required) Amount to invest.

**Response Structure:**

- **Success:**
    ```
    {
        status: success,
        message: 'Invested in venture'
    }
    ```
- **Fail:**
    ```
    {
        status: fail,
        message: <error_message>
    }
    ```
