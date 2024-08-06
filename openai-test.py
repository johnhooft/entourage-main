from openai import OpenAI
client = OpenAI()

response = client.images.generate(
  prompt="A reepacheep",
  n=2,
  size="1024x1024"
)

print(response)
