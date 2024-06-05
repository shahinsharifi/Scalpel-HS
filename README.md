

# SCALPEL-HS

This project is an implementation of the paper "What Should You Know? A Human-In-the-Loop Approach to Unknown Unknowns Characterization in Image Recognition" by Shahin Sharifi Noorian, Sihang Qiu, Ujwal Gadiraju, Jie Yang, and Alessandro Bozzon, presented at the ACM Web Conference 2022.

The project consists of a crowdsourcing tool that helps in detecting and characterizing unknown unknowns in image recognition models. It leverages human intelligence to gather images that are potentially difficult for the machine, and provides a rich, descriptive characterization of unknown unknowns.

The project is divided into two main parts:

1. Crowdsourcing Client: An Angular application that serves as the user interface for the crowdsourcing tasks. It provides instructions and tasks to the users, and collects their responses.

2. Crowdsourcing Server: A Java server that handles the backend operations, including data management and communication with the client.

## Getting Started

### Prerequisites

- Java 1.6 or higher
- Node.js and npm
- Angular CLI

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-repo/crowdsourcing-tool.git
```

2. Navigate to the [``crowdsourcing/crowdsourcing-client``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fshahin%2FDocuments%2FPhD%2FCode%2FScalpel-HS%2Fcrowdsourcing%2Fcrowdsourcing-client%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/shahin/Documents/PhD/Code/Scalpel-HS/crowdsourcing/crowdsourcing-client") directory and install the dependencies:

```sh
cd crowdsourcing/crowdsourcing-client
npm install
```

3. Build the Angular project:

```sh
ng build
```

4. Navigate to the [``crowdsourcing/crowdsourcing-server``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fshahin%2FDocuments%2FPhD%2FCode%2FScalpel-HS%2Fcrowdsourcing%2Fcrowdsourcing-server%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/shahin/Documents/PhD/Code/Scalpel-HS/crowdsourcing/crowdsourcing-server") directory and build the Java project:

```sh
cd ../crowdsourcing-server
mvn clean install
```

## Usage

1. Start the server:

```sh
java -jar target/crowdsourcing-server-1.0.jar
```

2. Start the client:

```sh
cd ../crowdsourcing-client
ng serve
```

3. Open a web browser and navigate to `http://localhost:4200/` to start using the crowdsourcing tool.

## Testing

### Unit Tests

Run the unit tests for the client using Karma:

```sh
cd crowdsourcing/crowdsourcing-client
ng test
```

### End-to-End Tests

Run the end-to-end tests for the client using Protractor:

```sh
ng e2e
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Citation

If you use this tool in your research, please cite our paper:

```bibtex
@inproceedings{sharifi2022should,
  title={What Should You Know? A Human-In-the-Loop Approach to Unknown Unknowns Characterization in Image Recognition},
  author={Sharifi Noorian, Shahin and Qiu, Sihang and Gadiraju, Ujwal and Yang, Jie and Bozzon, Alessandro},
  booktitle={Proceedings of the ACM Web Conference 2022},
  pages={882--892},
  year={2022}
}
```

## Contact

For any questions or issues, please open an issue on GitHub or contact the authors of the paper.