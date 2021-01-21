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
        StreamName="Dev-Aspect-Feed-CreateStreamStack-1H4P7JYT1JAD3-KinesisStream-1R9JROM79JY3M",
        Data=bytes(json.dumps(ev), "utf-8"),
        PartitionKey=str(uuid.uuid4()),
    )
