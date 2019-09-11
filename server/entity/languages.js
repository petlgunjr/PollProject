const dbContext = require("../dbcontext");
const Table = require("unloop-database-dynamo")(dbContext.db, dbContext.docClient);

const key = "language";
exports.key = key;

exports.schema = {
    TableName : "Languages",
    BillingMode: "PROVISIONED",
    KeySchema: [
        { AttributeName: key, KeyType: "HASH"}
    ],
    AttributeDefinitions: [
        { AttributeName: key, AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

exports.initialData = [
    {
        language: "Html",
        count: 0 
    },
    {
        language: "CSS",
        count: 0
    },
    {
        language: "JavaScript",
        count: 0
    },
    {
        language: "React",
        count: 0
    }
];

exports.table = new Table(this);
