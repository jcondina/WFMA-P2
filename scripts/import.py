from os import path
import json
import sys
import uuid
import boto3
import boto3.session

if len(sys.argv) < 2:
    print(f"Usage:\n  > import.py <events-file>")
    exit(-1)

fname = sys.argv[1]

if not path.exists(fname):
    print(f"Data file: '{fname}' doesn't exist.")
    exit(-1)

with open(fname, "r") as file:
    events = json.load(file)

session = boto3.session.Session(
    aws_access_key_id="AKIAVH57FE6NIX2ORUEL",
    aws_secret_access_key="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",
    region_name="us-east-2",
)

client = session.client("kinesis")

for ev in events:
    client.put_record(
        StreamName="kronos-aspect-realtime-feed-CreateStreamStack-1SIXEGW59B6ES-KinesisStream-Gt8yxi9z2Ou6",
        Data=bytes(json.dumps(ev), "utf-8"),
        PartitionKey=str(uuid.uuid4()),
    )
