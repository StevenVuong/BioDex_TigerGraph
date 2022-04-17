Notes:
-  Data files are very large; information can be found [here](https://github.com/visipedia/inat_comp/tree/master/2021)

--- 

<P> We have experimented with the following: <br>

---

Which is the best model:
-  iNaturalist InceptionV3 Normalised:
    -  Top 1: 3153/7000
    -  Top 5:  4739/7000
-  imageNet ResNet 50 Normalised:
    -  Top 1: 1994/7000
    -  Top 5: 3601/7000
-  iNaturalist MobileNetV3 Normalised:
    -  Top 1: 273
    -  Top 5: 740

--- 

<br>Also tested normalised vs un-normalised; un-normalised results are unstable.

---

PCA vs Non-PCA. Using the InceptionV3 model:

-  100 dimensions:
    -  Top 1: 3143/7000
    -  Top 5: 4751/7000
    -  Time to build: 915 micro-seeconds
    -  Inference time for top 7000 with 5 Nearest-Neighbours: 898 milli-seconds
-  2048 dimensions (no dimension reduction):
    -  Top 1: 3254/7000
    -  Top 5: 4860/7000
    -  Time to build: 24.4 milli-seeconds
    -  Inference time for top 7000 with 5 Nearest-Neighbours:  1.83 seconds

Conclusion: Build time is much approx 2.5x slower and inference approx 2.2x slower but accuracy increase. To test how this scales with more data. <br>
But time is still very good so is acceptable for inference.

--- 

Tested T-SNE brute force match vs FAISS CPU, results are the same of:
-  Top 1: 3254/7000
-  Top 5: 4860/7000

But TSNE has time 7 minutes for query, faiss has 1.83s for query.