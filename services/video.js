const {
    db
} = require('./dbConnect')
const videoService = {};

videoService.getPopularVideos = () => {
    const sql = `
    SELECT video.*,
    rank() OVER(
        ORDER BY views DESC
    )
    FROM video
    LIMIT 10
    `;

    return db.any(sql);
};

videoService.getMasterVid = (id) => {
    const sql = `
    SELECT *
    FROM video
    WHERE id = $[id]
    `;

    return db.one(sql, {
        id
    });
};

videoService.getResponseToMaster = (id) => {
    const sql = `
    SELECT *
    FROM video
    WHERE response_to = $[id]
    `;

    return db.any(sql, {
        id
    })
};

videoService.getResponseToResponse = (id) => {
    const sql = `
    SELECT *
    FROM video 
    WHERE response_to = $[id]
    `;

    return db.any(sql, {
        id
    });
}

videoService.getAllCategories = () => {
    const sql = `
    SELECT *
    FROM category
    `;
    return db.any(sql);
}

videoService.getVidsOfCategory = (id) => {
    const sql = `
    SELECT *
    FROM video
    WHERE category_id = $[id]
    `;

    return db.any(sql, {
        id
    })
}

videoService.getVideos = (id) => {
    const sql = `
    SELECT *
    FROM video
    WHERE user_id = $[id]
    `;
    return db.any(sql, {
        id
    });
};

videoService.postVideo = (id, category, title, url, annotation, description) => {
    const sql = `
    INSERT INTO video (user_id, category_id, video_title, video_url, annotation, description)
    VALUES ($[id], $[category], $[title], $[url], $[annotation], $[description])
    RETURNING id`;

    return db.one(sql, {
        id,
        category,
        title,
        url,
        annotation,
        description
    });
};

videoService.deleteVideo = (id) => {
    const sql = `
    DELETE FROM video
    WHERE id = $[id]`;

    return db.none(sql, {
        id
    });
};

videoService.updateVideo = (id, title, description) => {
    const sql = `
    UPDATE video
    SET video_title = $[title], description = $[description]
    WHERE user_id = $[id]
    RETURNING id
    `
    return db.one(sql, {
        id,
        title,
        description
    })
}


module.exports = videoService;