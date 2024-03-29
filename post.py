import os
from boto.mturk.connection import MTurkConnection
from boto.mturk.question import ExternalQuestion
from boto.mturk.price import Price

AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']

if os.environ.get("I_AM_IN_DEV_ENV"):
    HOST = 'mechanicalturk.sandbox.amazonaws.com'
else:
    HOST = 'mechanicalturk.amazonaws.com'

connection = MTurkConnection(aws_access_key_id=AWS_ACCESS_KEY_ID,
                             aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                             host=HOST)

url = "https://dl.dropboxusercontent.com/u/113409/turk/code.html?img=ortho1.jpg&radius=25"
title = "Click all the cars and trucks in this image (COMPLETE THIS TASK ONLY ONCE!)"
description = "COMPLETE THIS TASK ONLY ONCE! All submissions after the first will be rejected"
keywords = ["easy", "image", "click"]
frame_height = 2000
amount = 0.25

questionform = ExternalQuestion(url, frame_height)


for _ in xrange(1):
    create_hit_result = connection.create_hit(
        title=title,
        description=description,
        keywords=keywords,
        max_assignments=1,
        question=questionform,
        reward=Price(amount=amount),
        response_groups=('Minimal', 'HITDetail'),  # I don't know what response groups are
    )
