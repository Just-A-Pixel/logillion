<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Dyte Project: Logimillion</h3>

  <p align="center">
    Log high volumes of logs with quick and efficient search results
    <br />
    <a href="https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel">View Demo</a>
    ·
    <a href="https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel/issues">Report Bug</a>
    ·
    <a href="https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img width="1683" alt="image" src="https://github.com/dyte-submissions/november-2023-hiring-Just-A-Pixel/assets/58350132/8fdfe72d-290c-45b5-9f1a-a00a1a65d28c">



Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `Just-A-Pixel`, `november-2023-hiring-Just-A-Pixel`, `twitter_handle`, `raj-anand0511`, `email_client`, `raj.anand0511@gmail.com`, `logimillion`, `project_description`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* Express
* Node
* Redis
* Elastic Search
* Docker


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Docker
* npm
  ```sh
  npm install npm@latest -g
  ```
* This project uses the ports 3000, 3001, 6379, 9200, 9300, 4000 and 4001
  

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel.git
   ```
2. Setup redis via docker
   ```
   docker run --name redis-queue -d -p 6379:6379 redis
   ```
3. Setup elasticsearch via docker
   ```
   docker run --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.10.1
   ```
   This docker runs attached to the terminal as it takes a little longer than others to be ready (around 30-60 seconds), hence it's easier to track when it's done.
   To run it without attaching to the terminal, pass ```-d``` flag. You can also check if elastic has spun up completely by running the curl: ```curl --location 'http://localhost:9200/' ```
   
4. When you spin up the elasticsearch container for the first time, do this step.
   After the elasticsearch container has finished booting up, (can be seen when the logs stop updating every few milliseconds), run the following curl command to setup explicit mapping:

```
curl --location --request PUT 'http://localhost:9200/logs' \
--header 'Content-Type: application/json' \
--data '{
    "mappings": {
        "properties": {
            "level": {
                "type": "keyword",
                "fields": {
                    "keyword": {
                        "type": "text"
                    }
                }
            },
            "message": {
                "type": "text"
            },
            "resourceId": {
                "type": "keyword",
                "fields": {
                    "keyword": {
                        "type": "text"
                    }
                }
            },
            "timestamp": {
                "type": "date",
                "fields": {
                    "keyword": {
                        "type": "text"
                    }
                }
            },
            "traceId": {
                "type": "keyword",
                "fields": {
                    "keyword": {
                        "type": "text"
                    }
                }
            },
            "spanId": {
                "type": "keyword",
                "fields": {
                    "keyword": {
                        "type": "text"
                    }
                }
            },
            "commit": {
                "type": "keyword",
                "fields": {
                    "keyword": {
                        "type": "text"
                    }
                }
            },
            "metadata": {
                "properties": {
                    "parentResourceId": {
                        "type": "keyword",
                        "fields": {
                            "keyword": {
                                "type": "text"
                            }
                        }
                    }
                }
            }
        }
    }
}'

```

If your response is this: ```curl: (52) Empty reply from server```, please wait for the docker container to finish setting up.

After the curl command runs succesfully, the response is ```{"acknowledged":true,"shards_acknowledged":true,"index":"logs"}```

5. There are 4 more terminals required for the following. Run these commands from the root to set them up.

In Terminal #1:
```
cd ingestor 
npm install
npx tsc
npm run dev
```

In Terminal #2:
```
cd consumer
npm install
npx tsc
npm run dev
```
In Terminal #3:

```
cd client 
npm install
npx tsc
npm run dev
```

In Terminal #4

```
cd frontend 
npm install
npm run dev
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Run the script for the problem statement on port 3000

2. UI is setup up localhost 4001

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

The UI offers multiple search methods

### Full text search

- Make sure to run the curl command for explicit mapping, otherwise calling requests can throw an error.
- 
Search across all keys for text. Currently, this supports exact word matching and not prefix matching. Prefix matching can be included by adding ```"type":       "phrase_prefix"``` in multi-match searching 

- Use the labels to choose which filters to apply. Click to select, click again to deselect. Green means the selected filter will be applied. The search text will return values present in either of the chosen filters, i.e, the filters work like OR condition.

### SEARCH FILTERS
- Search individual filters. These work in AND logic and use the ```type: keyword```, hence they are better optimised for searching keyword based filters.
- Click the labels, green means the filter will be used, grey means the filter is turned off.
- Use the date-time input to find logs within a range.

## System Design 

1. Ingestor takes all the incoming requests and localhost:3000 and pushes the results on an asynchronous message queue running on redis with bullmq.
2. Consumer picks up jobs for the redis queue and writes to elasticsearch.
3. Search server is the api interface between users who want to search data and elasticsearch.

Reasons for the same, limitations and further improvements:
- By using a queue, we merely push the response into the queue and do not wait for write operations. This reduces the response time between server and client, thus increasing the number of write requests that the clients can send per second. The queue stores these requests to be processed at a time when the resources are available.
- Elastic search on the cloud, on its own can handle over a million writes per second. Thus, this system is sufficient for most of usecases. But, if one wants to further improve the volume, one can use a warm cache like MongoDB with one or more nodes, and listen to write updates, then update the elastic search db.
- Mustache is a popular golang library that helps to sync data between mongo and elastic.
- A load balancer like nginx can also be used to further increase capacity.
- Kafka can be used instead of redis for better performance on production.
- For identity management, using postgreSQL to store hashed passwords is a good solution. It can further be used to generate JWTs and provide authentication and authorization. 
  


<!-- ROADMAP -->
## Roadmap

- [ ] Search single and multiple keys for full text search
- [ ] Search single and multiple filter keys
- [ ] Search within specific date ranges.
    - [ ] Nested Feature

See the [open issues](https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Raj Anand - [@twitter_handle](https://twitter.com/twitter_handle) - raj.anand0511@gmail.com@email_client.com

Project Link: [https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel](https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Just-A-Pixel/november-2023-hiring-Just-A-Pixel.svg?style=for-the-badge
[contributors-url]: https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Just-A-Pixel/november-2023-hiring-Just-A-Pixel.svg?style=for-the-badge
[forks-url]: https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel/network/members
[stars-shield]: https://img.shields.io/github/stars/Just-A-Pixel/november-2023-hiring-Just-A-Pixel.svg?style=for-the-badge
[stars-url]: https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel/stargazers
[issues-shield]: https://img.shields.io/github/issues/Just-A-Pixel/november-2023-hiring-Just-A-Pixel.svg?style=for-the-badge
[issues-url]: https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel/issues
[license-shield]: https://img.shields.io/github/license/Just-A-Pixel/november-2023-hiring-Just-A-Pixel.svg?style=for-the-badge
[license-url]: https://github.com/Just-A-Pixel/november-2023-hiring-Just-A-Pixel/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/raj-anand0511
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
