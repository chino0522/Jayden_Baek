# DNS Resolution Process Explained

#### #DNS #DomainNameService #ipaddress #Linux
#### 2024-09-28

![DNS](/posts/dns_resolution_process_explained/dns_cover_image.jpg)

**DNS (Domain Name System)** is a technology that helps internet users with connecting to servers (websites) with **alphabets (domain name)** instead of inserting servers' **ip addresses**.

Domain name consists with **hierarchy (levels):**

![domain_levels](/posts/dns_resolution_process_explained/dns_level.jpeg)

The following table contains the details about how DNS finds the desired ip address of the domain name **(domain name: `www.example.com`):**

| Process | Action | What happens |
| ------- | ------ | ------------ |
| **1. Query Sent to Local DNS Cache** | The browser **checks the local DNS cache** stored on user's computer to find a desired ip address of the `www.example.com`. | If the ip address is found in the cache, t**he browser uses it to connect to the web server.** If not, the query moves to the next step. |
| **2. Query Sent to Recursive DNS Resolver** | The browser sends the DNS query to the **recursive DNS resolver** configured by user's ISP (Internet Service Provider) or a third-party DNS (Google DNS or Cloudfare). | The recursive resolver acts as an **intermediary**, trying to resolve the `www.example.com` by **querying other DNS servers** in a hierarchical manner. |
| **3. Recursive Resolver Checks Its Cache** | The recursive resolver **checks its own cache** for the IP address of the `www.example.com` | If the IP address is in its cache, it **returns the IP to the browser**. If not, it proceeds to the next step. |
| **4. Query Sent to Root DNS Server** | The recursive resolver **queries one of the 13 root DNS servers (e.g., a.root-servers.net)** to find the IP address of the Top-Level Domain (TLD) DNS server responsible for `.com` | The **root server doesn't know the IP address of `www.example.com`** but it responds with the IP address of the `.com` TLD server. |
| **5. Query Sent to TLD DNS Server** | The recursive resolver sends a query to the `.com` TLD DNS server (e.g., a.gtld-servers.net) to **find the authoritative DNS server for `example.com`** | The TLD server **doesn't have the exact IP address** of `www.example.com`, but it **knows the authoritative DNS server responsible** for `example.com`. It returns the IP address of the authoritative DNS server. |
| **6. Query Sent to Authoritative DNS Server** | The recursive resolver **sends a query to the authoritative DNS server** for `example.com` (e.g., ns1.exampledns.com). | The **authoritative DNS server has the DNS records for `example.com`**, including the IP address for `www.example.com`. It returns the IP address (e.g., 192.0.2.1) to the recursive resolver. |
| **7. Recursive Resolver Returns the IP Address to Browser** | The **recursive resolver caches the IP address** and sends it back to the user's browser. | The browser now knows the IP address of `www.example.com` and can proceed to connect to the web server. |

### Here is the brief summary of DNS server types:

1. **Local DNS Cache:** Stored on user's device, for quick access to recently queried domains.
2. **Recursive DNS Resolver:** Intermediary server that performs the recurvice search.
3. **Root DNS Servers:** The starting point of DNS resolution, directing queries to the appropriate TLD servers.
4. **TLD DNS Servers:** Servers responsible for Top-Level Domains like `.com`, `.org`, `.net`.
5. **Authoritative DNS Servers:** Servers that contain the DNS records for specific domains.

> **The entire process usually completes in milliseconds, allowing users to quickly access websites without noticing any delay**